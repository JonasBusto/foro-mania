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
} from 'firebase/database';

export function useChatAction() {
	// Encuentra o crea un chat entre dos usuarios
	async function findOrCreateChat(user1Id, user2Id) {
		const db = getDatabase();
		const chatKey = [user1Id, user2Id].sort().join('_'); // Crea una clave única para el chat

		// Consulta para encontrar un chat existente
		const chatQuery = query(
			ref(db, 'chats'),
			orderByChild('participants'),
			equalTo(chatKey)
		);

		const chatSnapshot = await get(chatQuery);
		let chatId;

		if (chatSnapshot.exists()) {
			// Si se encuentra un chat existente, devuelve el ID del chat
			chatSnapshot.forEach((childSnapshot) => {
				chatId = childSnapshot.key;
			});
		} else {
			// Si no se encuentra un chat, crea uno nuevo
			const newChatRef = push(ref(db, 'chats'));
			chatId = newChatRef.key;
			await set(newChatRef, {
				participants: chatKey,
				createdAt: Date.now(),
				messages: {}, // Inicializa el nodo de mensajes vacío
			});
		}

		return chatId;
	}

	async function sendMessage(chatId, senderId, content) {
		const db = getDatabase();
		const messageRef = push(ref(db, `chats/${chatId}/messages`));
		await set(messageRef, {
			senderId,
			content,
			timestamp: Date.now(),
		});
	}

	const clearChatMessages = async (chatId) => {
		try {
			const messagesRef = ref(getDatabase(), `chats/${chatId}/messages`);
			await remove(messagesRef);
		} catch (error) {
			console.error('Error al vaciar los mensajes del chat:', error);
		}
	};

	return {
		findOrCreateChat,
		sendMessage,
		clearChatMessages,
	};
}
