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
	onChildAdded,
} from 'firebase/database';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUnreadMessagesCount } from '../store/chat/slice';

export function useChatAction() {
	const [newMessages, setNewMessages] = useState([]);
	const dispatch = useDispatch();

	// funcion para buscar chat entre usuarios 1 y 2. Si no lo encuentra crea uno
	const findOrCreateChat = async (user1Id, user2Id) => {
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
	};

	// funcion para enviar mensajes entre usuarios
	const sendMessage = async (chatId, senderId, content) => {
		const db = getDatabase();
		const messageRef = push(ref(db, `chats/${chatId}/messages`));
		// envia los datos recibidos y la propiedad isRead en false
		await set(messageRef, {
			senderId,
			content,
			timestamp: Date.now(),
			isRead: false,
		});
	};

	// funcion para limpiar todos los mensajes del chat
	const clearChatMessages = async (chatId) => {
		try {
			const messagesRef = ref(getDatabase(), `chats/${chatId}/messages`);
			await remove(messagesRef);
			alert('Historial de Chat eliminado');
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

	// función para escuchar nuevos mensajes en tiempo real
	const listenForNewMessages = (user1Id) => {
		const db = getDatabase();
		const chatsRef = ref(db, 'chats');
		onChildAdded(chatsRef, (snapshot) => {
			const chatId = snapshot.key;
			const chatData = snapshot.val();
			if (
				chatData &&
				chatData.participants &&
				chatData.participants.includes(user1Id)
			) {
				const messagesRef = ref(db, `chats/${chatId}/messages`);
				onChildAdded(messagesRef, async (messageSnapshot) => {
					const newMessage = messageSnapshot.val();
					if (newMessage.senderId !== user1Id && !newMessage.isRead) {
						setNewMessages((prevMessages) => [
							...prevMessages,
							{ chatId, ...newMessage },
						]);
						// Actualiza el estado global con el nuevo conteo
						try {
							const totalUnread = await getTotalUnreadMessages(user1Id);
							dispatch(setUnreadMessagesCount(totalUnread));
						} catch (error) {
							console.error(
								'Error al obtener mensajes no leídos:',
								error
							);
						}
					}
				});
			}
		});
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
			try {
				const totalUnread = await getTotalUnreadMessages(userId);
				dispatch(setUnreadMessagesCount(totalUnread));
			} catch (error) {
				console.error('Error al obtener mensajes no leídos:', error);
			}
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
		markMessagesAsRead,
		checkUnreadMessages,
		getTotalUnreadMessages,
		listenForNewMessages,
		newMessages,
	};
}
