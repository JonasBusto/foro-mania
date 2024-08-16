import { useEffect, useState } from 'react';
import { useUserAction } from '../../hooks/useUserAction';
import { useAuth } from '../../hooks/useAuth';
import { useChatAction } from '../../hooks/useChatAction';
import { Loader } from '../../components/items/Loader';

export function UsersList({ onSelectUser }) {
	const { users, allUsersStatus } = useUserAction();
	const { loggedUser } = useAuth();
	const { checkUnreadMessages, listenForNewMessages, newMessages } =
		useChatAction();
	const [unreadMessagesCount, setUnreadMessagesCount] = useState({});
	const [search, setSearch] = useState('');
	const [unreadCount, setUnreadCount] = useState(0);

	const updateUnreadCount = (newCount) => {
		setUnreadCount(newCount);
	};

	useEffect(() => {
		listenForNewMessages(loggedUser.uid, updateUnreadCount);
	}, []);

	useEffect(() => {
		const fetchUnreadMessagesOnNewMessage = async () => {
			if (newMessages.length > 0) {
				const user1Id = loggedUser.uid;
				const counts = { ...unreadMessagesCount };
				for (const message of newMessages) {
					const { chatId, senderId } = message;
					if (senderId !== user1Id) {
						const unreadCount = await checkUnreadMessages(
							chatId,
							user1Id
						);
						const user = users.find((user) => user.uid === senderId);
						if (user) {
							counts[user.uid] = unreadCount;
						}
					}
				}
				setUnreadMessagesCount(counts);
			}
		};

		fetchUnreadMessagesOnNewMessage();
	}, [newMessages, users]);

	const filteredUsers = users.filter(
		(user) =>
			user.uid !== loggedUser?.uid &&
			user.fullName.toLowerCase().includes(search.toLowerCase())
	);

		// Ordenar los usuarios con mensajes no leídos primero
		const sortedUsers = filteredUsers.sort((a, b) => {
			const unreadA = unreadMessagesCount[a.uid] || 0;
			const unreadB = unreadMessagesCount[b.uid] || 0;
			return unreadB - unreadA; // Ordenar de mayor a menor
		});

	return (
		<div className='pb-10'>
			<div className=' mt-2 p-3 flex justify-center items-center mx-2 border border-neutral-600'>
				<input
					type='text'
					placeholder='Buscar usuario...'
					className=' px-2 py-2 bg-[#1b1b1b] text-white w-full placeholder-gray-500  rounded-md focus:outline-none focus:ring-2 focus:ring-[#61dafb]'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
			<div className=' text-white  h-full overflow-auto mx-2 border border-neutral-600'>
				{allUsersStatus === 'Cargando' && (
					<div className='min-h-[50vh] flex items-center justify-center'>
						<Loader />
					</div>
				)}

				<div className='flex flex-col'>
					{sortedUsers.map((user) => (
						<button
							key={user.uid}
							onClick={() => onSelectUser(user)}
							className=' hover:bg-neutral-800 border-b border-neutral-600 duration-200 flex items-center p-1'>
							<img
								src={user.photoProfile}
								alt={user.fullName}
								className='rounded-sm object-cover w-14 h-14'
							/>
							<span className='ms-4 font-semibold text-xl'>
								{user.fullName}
							</span>
							{unreadMessagesCount[user.uid] > 0 && (
								<span className=' bg-[#61dafb] font-semibold ms-auto me-2 text-black text-xs rounded-full w-6 h-6 flex items-center justify-center'>
									{unreadMessagesCount[user.uid]}
								</span>
							)}
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
