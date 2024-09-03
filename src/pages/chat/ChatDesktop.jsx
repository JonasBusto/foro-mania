import { useEffect, useRef, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { getDatabase } from 'firebase/database';
import { useChatAction } from '../../hooks/useChatAction';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/chat.css';
import EmojiPicker from 'emoji-picker-react';

export function ChatDesktop({ chatId, selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { loggedUser } = useAuth();
  const { sendMessage, markMessagesAsRead } = useChatAction();
  const user1Id = loggedUser.uid;
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [userScrolled, setUserScrolled] = useState(false);

  useEffect(() => {
    if (chatId) {
      const messagesRef = ref(getDatabase(), `chats/${chatId}/messages`);
      const unsubscribe = onValue(messagesRef, (snapshot) => {
        const msgs = [];
        snapshot.forEach((childSnapshot) => {
          msgs.push({ id: childSnapshot.key, ...childSnapshot.val() });
        });
        if (JSON.stringify(msgs) !== JSON.stringify(messages)) {
          setMessages(msgs);
        }
      });

      const markMessagesRead = async () => {
        await markMessagesAsRead(chatId, user1Id);
      };
      markMessagesRead();
      return () => unsubscribe();
    }
  }, [chatId, markMessagesAsRead, user1Id]);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (container && !userScrolled) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, userScrolled]);

  useEffect(() => {
    const container = chatContainerRef.current;
    const handleScroll = () => {
      if (container) {
        const isScrolledToBottom =
          container.scrollHeight - container.scrollTop ===
          container.clientHeight;
        setUserScrolled(!isScrolledToBottom);
      }
    };

    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  const handleSendMessage = async () => {
    try {
      if (newMessage.trim()) {
        await sendMessage(chatId, user1Id, newMessage);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  };

  const handleEmojiClick = (emojiData) => {
    if (emojiData) {
      setNewMessage((prevMessage) => prevMessage + emojiData.emoji);
      setShowEmojiPicker(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <main className='text-neutral-200 flex flex-col flex-1'>
      {selectedUser !== '' ? (
        <div className='h-[31.5rem] flex flex-col'>
          <section
            ref={chatContainerRef}
            className=' overflow-y-auto p-2 bg-neutral-900 grow'
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.senderId === user1Id ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`relative break-words flex flex-col m-1 p-1 rounded-md ${
                    msg.senderId === user1Id
                      ? 'bg-blue-200 text-black  items-end pl-5'
                      : 'bg-green-200 text-black pr-5'
                  }`}
                >
                  <p className='m-0 p-0'>{msg.content}</p>
                  <p className='text-xs text-[#828181] mt-1'>
                    {formatTimestamp(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </section>
          <section className='flex items-center p-2 border-t border-neutral-700'>
            <button
              type='button'
              className='text-[#61dafb] bg-[#282828] hover:bg-[#383838] focus:outline-none rounded-sm border border-[#61dafb]'
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
              <i className='pi pi-face-smile text-xl p-2'></i>
            </button>
            <input
              type='text'
              className='text-neutral-100 w-full bg-neutral-800 p-2 rounded-md flex items-center mx-2 outline-none'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='Escribe tu mensaje...'
            />
            <div className='flex flex-wrap items-center justify-center'>
              <button
                className='w-30 flex justify-center items-center text-center p-2 text-md font-medium text-[#61dafb] bg-[#282828] hover:bg-[#383838] focus:outline-none rounded-sm border border-[#61dafb]'
                onClick={handleSendMessage}
              >
                Enviar
              </button>
            </div>
          </section>
          {showEmojiPicker && (
            <div className=' emoji-picker-container'>
              <EmojiPicker
                theme='dark'
                searchDisabled={true}
                previewConfig={{ showPreview: false }}
                style={{ width: '100%', height: '15rem', fontSize: '0.8rem' }}
                allowExpandReactions={false}
                onEmojiClick={handleEmojiClick}
              />
            </div>
          )}
        </div>
      ) : (
        <div className='m-auto mt-40 '>
          <p className='italic'>
            Selecciona un contacto para comenzar a chatear!
          </p>
        </div>
      )}
    </main>
  );
}
