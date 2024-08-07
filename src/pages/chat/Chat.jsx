/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { getDatabase } from 'firebase/database';
import { useChatAction } from '../../hooks/useChatAction';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/chat.css';
import Picker from 'emoji-picker-react';

export function Chat({ user2, chatId }) {
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState('');
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const { loggedUser } = useAuth();
	const { fullName, photoProfile } = user2;
	const { sendMessage, markMessagesAsRead } = useChatAction();
	const user1Id = loggedUser.uid;

	// carga todos los mensajes entre los usuarios
	useEffect(() => {
		if (chatId) {
			const messagesRef = ref(getDatabase(), `chats/${chatId}/messages`);
			onValue(messagesRef, (snapshot) => {
				const msgs = [];
				snapshot.forEach((childSnapshot) => {
					msgs.push({ id: childSnapshot.key, ...childSnapshot.val() });
				});
				setMessages(msgs);
			});

			// marca todos los mensajes como leídos cuando se carga el chat
			const markMessagesRead = async () => {
				await markMessagesAsRead(chatId, user1Id);
			};
			markMessagesRead();
		}
	}, [chatId]);

	// función para convertir fecha y hora de timestamp
	function formatTimestamp(timestamp) {
		const date = new Date(timestamp);
		return date.toLocaleString();
	}

	// función para enviar mensaje (useChatActions)
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

	const handleEmojiClick = (event, emojiObject) => {
		if (emojiObject && emojiObject.emoji) {
			setNewMessage((prevMessage) => prevMessage + emojiObject.emoji);
		}
		setShowEmojiPicker(false);
	};

	// manejador de eventos para la tecla Enter
	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault(); 
			handleSendMessage();
		}
	};

	return (
		<main className='text-neutral-200  mx-3 flex flex-col  '>
			<div className='flex-1'>
				<section className='border-2 border-[#61dafb] rounded-md bg-[#282828] overflow-y-auto p-2 h-[50vh]'>
					{messages.map((msg) => (
						<div
							key={msg.id}
							className={`flex ${
								msg.senderId === user1Id
									? 'justify-end'
									: 'justify-start'
							}`}>
							<div
								className={`relative break-words flex flex-col m-2 p-1 rounded-md ${
									msg.senderId === user1Id
										? 'bg-blue-200 text-black pl-10'
										: 'bg-green-200 text-black pr-10'
								}`}>
								<p className='m-0 p-0'>{msg.content}</p>
								<p className='text-xs text-[#999] mt-1'>
									{formatTimestamp(msg.timestamp)}
								</p>
							</div>
						</div>
					))}
				</section>
				<section className='flex flex-wrap items-center justify-around my-3'>
					<input
						type='text'
						className='text-black w-4/6 p-3 mt-2 rounded-md flex items-center'
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder='Escribe tu mensaje...'
					/>
					<button
						type='button'
						className='text-[#61dafb] bg-[#282828] hover:bg-[#383838] focus:outline-none rounded-lg border border-[#61dafb]'
						onClick={() => setShowEmojiPicker((prev) => !prev)}>
						<i className='pi pi-face-smile text-xl p-2'></i>
					</button>
					{showEmojiPicker && (
						<div className='absolute z-10 bottom-12'>
							<div className='relative'>
								<Picker onEmojiClick={handleEmojiClick} />
								<button
									className='absolute top-0 right-0 p-2 text-black'
									onClick={() => setShowEmojiPicker(false)}>
									<i className='pi pi-times'></i>
								</button>
							</div>
						</div>
					)}
					<div className='flex flex-wrap items-center justify-center'>
						<button
							className='w-30 flex justify-center items-center text-center p-2 text-md font-medium text-[#61dafb] bg-[#282828] hover:bg-[#383838] focus:outline-none rounded-lg border border-[#61dafb]  '
							onClick={handleSendMessage}>
							<i className='pi pi-comment text-xl pr-2'></i>
							Enviar
						</button>
					</div>
				</section>
			</div>
		</main>
	);
}
