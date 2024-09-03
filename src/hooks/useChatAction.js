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
import {
  clearUnreadMessagesCount,
  setUnreadMessagesCount,
} from '../store/chat/slice';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from './store';

export function useChatAction() {
  const unreadMessagesCount = useAppSelector(
    (state) => state.chat.unreadMessagesCount
  );

  const [newMessages, setNewMessages] = useState([]);
  const dispatch = useAppDispatch();

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
    return chatId;
  };

  const sendMessage = async (chatId, senderId, content) => {
    const db = getDatabase();
    const messageRef = push(ref(db, `chats/${chatId}/messages`));

    await set(messageRef, {
      senderId,
      content,
      timestamp: Date.now(),
      isRead: false,
    });
  };

  const clearChatMessages = async (chatId) => {
    try {
      const messagesRef = ref(getDatabase(), `chats/${chatId}/messages`);
      await remove(messagesRef);
      toast.info('Historial de Chat eliminado');
    } catch (error) {
      console.error('Error al vaciar los mensajes del chat:', error);
    }
  };

  const checkUnreadMessages = async (chatId, userLoggedId) => {
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
  };

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
            try {
              const totalUnread = await getTotalUnreadMessages(user1Id);
              dispatch(setUnreadMessagesCount(totalUnread));
            } catch (error) {
              console.error('Error al obtener mensajes no leídos:', error);
            }
          }
        });
      }
    });
  };

  const markMessagesAsRead = async (chatId, userId) => {
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
      try {
        const totalUnread = await getTotalUnreadMessages(userId);
        dispatch(setUnreadMessagesCount(totalUnread));
      } catch (error) {
        console.error('Error al obtener mensajes no leídos:', error);
      }
    }
  };

  const getTotalUnreadMessages = async (userId) => {
    const db = getDatabase();
    const chatsRef = ref(db, 'chats');
    try {
      const snapshot = await get(chatsRef);
      const chats = snapshot.val();
      let totalUnread = 0;
      for (const chatId in chats) {
        const chat = chats[chatId];
        if (chat.participants && chat.participants.includes(userId)) {
          if (chat.messages) {
            for (const messageId in chat.messages) {
              const message = chat.messages[messageId];
              if (message.isRead === false && message.senderId !== userId) {
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

  const clearCountMessagesByUser = () => {
    dispatch(clearUnreadMessagesCount());
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
    clearCountMessagesByUser,
    unreadMessagesCount,
  };
}
