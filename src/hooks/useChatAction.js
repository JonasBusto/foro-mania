import {
	getDatabase,
	ref,
	query,
	orderByChild,
	equalTo,
	push,
	set,
	get,
	remove,
	update,
} from 'firebase/database';

export function useChatAction() {
	// funcion para buscar chat entre usuarios 1 y 2. Si no lo encuentra crea uno
	async function findOrCreateChat(user1Id, user2Id) {
		const db = getDatabase();
		const chatKey = [user1Id, user2Id].sort().join('_');
		const chatQuery = query(
			ref(db, 'chats'),
			orderByChild('participants'),
			equalTo(chatKey)
		);
		const chatSnapshot = await get(chatQuery);
		let chatId;
		// si existe chat trae todos los mensajes
		if (chatSnapshot.exists()) {
			chatSnapshot.forEach((childSnapshot) => {
				chatId = childSnapshot.key;
			});
		} else {
			// si no existe crea el chat entre los participantes
			const newChatRef = push(ref(db, 'chats'));
			chatId = newChatRef.key;
			await set(newChatRef, {
				participants: chatKey,
				createdAt: Date.now(),
				messages: {},
			});
		}
		return chatId;
	}

	// funcion para enviar mensajes entre usuarios
	async function sendMessage(chatId, senderId, content) {
		const db = getDatabase();
		const messageRef = push(ref(db, `chats/${chatId}/messages`));
		// envia los datos recibidos y la propiedad isRead en false
		await set(messageRef, {
			senderId,
			content,
			timestamp: Date.now(),
			isRead: false,
		});
	}

	// funcion para limpiar todos los mensajes del chat
	const clearChatMessages = async (chatId) => {
		try {
			const messagesRef = ref(getDatabase(), `chats/${chatId}/messages`);
			await remove(messagesRef);
		} catch (error) {
			console.error('Error al vaciar los mensajes del chat:', error);
		}
	};

	// funcion para chequear mensajes no leidos de cada chat
	const checkUnreadMessages = async (chatId, userLoggedId) => {
		const db = getDatabase();
		const messagesRef = ref(db, `chats/${chatId}/messages`);
		const messagesSnapshot = await get(messagesRef);
		if (messagesSnapshot.exists()) {
			let unreadMessages = 0;
			// itera sobre cada mensaje que no este leido
			messagesSnapshot.forEach((message) => {
				if (
					message.val().senderId !== userLoggedId &&
					!message.val().isRead
				) {
					unreadMessages += 1;
				}
			});
			return unreadMessages;
		}
		return 0;
	};

	// funcion para marcar como leido los mensajes al ingresar al chat
	const markMessagesAsRead = async (chatId, userId) => {
		const db = getDatabase();
		const messagesRef = ref(db, `chats/${chatId}/messages`);
		const messagesSnapshot = await get(messagesRef);
		if (messagesSnapshot.exists()) {
			const updates = {};
			// itera sobre cada mensajes que read es false y lo modifica a true
			messagesSnapshot.forEach((message) => {
				const messageData = message.val();
				if (messageData.senderId !== userId && !messageData.isRead) {
					updates[message.key] = { ...messageData, isRead: true };
				}
			});
			await update(messagesRef, updates);
		}
	};

	// funcion para traer todos los mensajes no leidos al navbar
	const getTotalUnreadMessages = async (userId) => {
		const db = getDatabase();
		const chatsRef = ref(db, 'chats');
		try {
			const snapshot = await get(chatsRef);
			const chats = snapshot.val();
			let totalUnread = 0;
			for (const chatId in chats) {
				const chat = chats[chatId];
				// Verifica si el usuario es un participante del chat
				if (chat.participants && chat.participants.includes(userId)) {
					// Verifica si `messages` existe e itera sobre todos los mensajes
					if (chat.messages) {
						for (const messageId in chat.messages) {
							const message = chat.messages[messageId];
							// Cuenta cada mensaje si no fue leído y fue enviado por otro usuario
							if (
								message.isRead === false &&
								message.senderId !== userId
							) {
								totalUnread += 1;
							}
						}
					}
				}
			}
			return totalUnread;
		} catch (error) {
			console.error('Error al buscar mensajes no leidos:', error);
			return 0;
		}
	};

	return {
		findOrCreateChat,
		sendMessage,
		clearChatMessages,
		checkUnreadMessages,
		markMessagesAsRead,
		getTotalUnreadMessages,
	};
}
