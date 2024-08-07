/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Banner } from '../../components/home/Banner';
import { useUserAction } from '../../hooks/useUserAction';
import { useAuth } from '../../hooks/useAuth';
import { useChatAction } from '../../hooks/useChatAction';

export function UsersList({ onSelectUser }) {
	const { users, allUsersStatus } = useUserAction();
	const { loggedUser } = useAuth();
	const { findOrCreateChat, checkUnreadMessages } = useChatAction();
	const [unreadMessagesCount, setUnreadMessagesCount] = useState({});
	const [search, setSearch] = useState('');
	const userLoggedId = loggedUser.uid;

	// verifica si hay mensajes no leidos entre los usuarios y devuelve la cantidad sin leer

	const UnreadMessages = async () => {
		const counts = {};
		for (const user of users) {
			const chatId = await findOrCreateChat(userLoggedId, user.uid);
			const unreadCount = await checkUnreadMessages(chatId, userLoggedId);
			counts[user.uid] = unreadCount;
		}
		setUnreadMessagesCount(counts);
	};

	useEffect(() => {
		UnreadMessages();
	}, []);

	// filtra el usuario logueado del listado de chats
	const filteredUsers = users.filter(
		(user) =>
			user.uid !== loggedUser?.uid &&
			user.fullName.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div>
			<Banner />
			<h2 className='text-neutral-200 text-center font-bold text-2xl'>
				Sala de Chat
			</h2>
			<div className='bg-transparent mt-2 p-3  rounded-md  flex justify-center items-center'>
				<input
					type='text'
					placeholder='Buscar usuario...'
					className='sm:w-1/3 md:w-1/3 px-2 py-2 bg-[#1b1b1b] text-white placeholder-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#61dafb]'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
			{allUsersStatus === 'Cargando' && (
				<div className='min-h-[50vh] flex items-center'>
					<ProgressSpinner />
				</div>
			)}
			<div className='flex flex-row flex-wrap items-center justify-around'>
				{filteredUsers.map((user) => (
					<button
						key={user.uid}
						onClick={() => onSelectUser(user)}
						className='relative text-neutral-200 flex flex-col w-[150px] h-[20vh] m-4 items-center'>
						<img
							src={user.photoProfile}
							alt={user.fullName}
							width={50}
							height={50}
							className='rounded'
						/>
						<span className='text-center m-2 font-bold text-xl flex-grow'>
							{user.fullName}
						</span>
						{unreadMessagesCount[user.uid] > 0 && (
							<span className='absolute top-0 right-0 bg-[#61dafb] font-semibold text-black text-xs rounded-full px-3 py-2'>
								{unreadMessagesCount[user.uid]}
							</span>
						)}
					</button>
				))}
			</div>
		</div>
	);
}
