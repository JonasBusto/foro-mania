import { createAsyncThunk } from '@reduxjs/toolkit';
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

export const findOrCreateChat = createAsyncThunk(
  'chat/findOrCreateChat',
  async ({ user1Id, user2Id }) => {
    const db = getDatabase();
    const chatKey = [user1Id, user2Id].sort().join('_');

    const chatQuery = query(
      ref(db, 'chats'),
      orderByChild('participants'),
      equalTo(chatKey)
    );

    const chatSnapshot = await get(chatQuery);
    let chatId;

    if (chatSnapshot.exists()) {
      chatSnapshot.forEach((childSnapshot) => {
        chatId = childSnapshot.key;
      });
    } else {
      const newChatRef = push(ref(db, 'chats'));
      chatId = newChatRef.key;
      await set(newChatRef, {
        participants: chatKey,
        createdAt: Date.now(),
        messages: {},
      });
    }

    return { chatId };
  }
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ chatId, senderId, content }) => {
    if (!chatId || !senderId || !content) {
      console.error('Datos invalidos para enviar:', {
        chatId,
        senderId,
        content,
      });
      throw new Error('Datos Invalidos');
    }
    const db = getDatabase();
    const messageRef = push(ref(db, `chats/${chatId}/messages`));
    await set(messageRef, {
      senderId,
      content,
      timestamp: Date.now(),
      isRead: false,
    });
  }
);

export const clearChatMessages = createAsyncThunk(
  'chat/clearChatMessages',
  async ({ chatId }) => {
    try {
      const messagesRef = ref(getDatabase(), `chats/${chatId}/messages`);
      await remove(messagesRef);
    } catch (error) {
      console.error('Error al vaciar los mensajes del chat:', error);
    }
  }
);

export const checkUnreadMessages = createAsyncThunk(
  'chat/checkUnreadMessages',
  async ({ chatId, userLoggedId }) => {
    const db = getDatabase();
    const messagesRef = ref(db, `chats/${chatId}/messages`);
    const messagesSnapshot = await get(messagesRef);
    if (messagesSnapshot.exists()) {
      let unreadMessages = 0;
      messagesSnapshot.forEach((message) => {
        if (message.val().senderId !== userLoggedId && !message.val().isRead) {
          unreadMessages += 1;
        }
      });
      return unreadMessages;
    }
    return 0;
  }
);

export const markMessagesAsRead = createAsyncThunk(
  'chat/markMessagesAsRead',
  async ({ chatId, userId }) => {
    const db = getDatabase();
    const messagesRef = ref(db, `chats/${chatId}/messages`);
    const messagesSnapshot = await get(messagesRef);

    if (messagesSnapshot.exists()) {
      const updates = {};
      messagesSnapshot.forEach((message) => {
        const messageData = message.val();
        if (messageData.senderId !== userId && !messageData.isRead) {
          updates[message.key] = { ...messageData, isRead: true };
        }
      });
      await update(messagesRef, updates);
    }

    return {
      findOrCreateChat,
      sendMessage,
      clearChatMessages,
      checkUnreadMessages,
      markMessagesAsRead,
    };
  }
);
