/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { getDatabase } from 'firebase/database';
import { useChatAction } from '../../hooks/useChatAction';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/chat.css';
// recibe prop de chats
export function Chat({ user2, chatId }) {
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState('');
	const { loggedUser } = useAuth();
	const user1Id = loggedUser.uid;
	const { fullName, photoProfile } = user2;
	const { sendMessage } = useChatAction();

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
		}
	}, [chatId]);

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
						className='text-black w-3/4 p-3 mt-2 rounded-md flex items-center'
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
						placeholder='Escribe tu mensaje...'
					/>
					<div className='flex flex-wrap items-center justify-center'>
						<button
							className='w-30 text-center py-2 px-5 text-sm font-medium text-[#61dafb] bg-[#282828] hover:bg-[#383838] focus:outline-none rounded-lg border border-[#61dafb]  '
							onClick={handleSendMessage}>
							<i className='pi pi-comment  mr-2'></i>
							Enviar
						</button>
					</div>
				</section>
			</div>
		</main>
	);
}
