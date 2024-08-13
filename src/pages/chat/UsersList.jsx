import { useEffect, useState } from 'react';
import { useUserAction } from '../../hooks/useUserAction';
import { useAuth } from '../../hooks/useAuth';
import { useChatAction } from '../../hooks/useChatAction';
import { Loader } from '../../components/items/Loader';

export function UsersList({ onSelectUser }) {
	const { users, allUsersStatus } = useUserAction();
	const { loggedUser } = useAuth();
	const { findOrCreateChat, checkUnreadMessages } = useChatAction();
	const [unreadMessagesCount, setUnreadMessagesCount] = useState({});
	const [search, setSearch] = useState('');
	const [loadingUnreadMessages, setLoadingUnreadMessages] = useState(true);
	const userLoggedId = loggedUser.uid;

	const fetchUnreadMessages = async () => {
		setLoadingUnreadMessages(true);
		const counts = {};
		for (const user of users) {
			const chatId = await findOrCreateChat(userLoggedId, user.uid);
			const unreadCount = await checkUnreadMessages(chatId, userLoggedId);
			counts[user.uid] = unreadCount;
		}
		setUnreadMessagesCount(counts);
		setLoadingUnreadMessages(false);
	};

	useEffect(() => {
		if (users.length > 0) {
			fetchUnreadMessages();
		}
	}, [users]);

	const filteredUsers = users.filter(
		(user) =>
			user.uid !== loggedUser?.uid &&
			user.fullName.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className='pb-10'>
			{/* <Banner />
			<h2 className='text-neutral-200 text-center font-bold text-2xl'>
				Sala de Chat
			</h2> */}
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
				{(allUsersStatus === 'Cargando' || loadingUnreadMessages) && (
					<div className='min-h-[50vh] flex items-center justify-center'>
						<Loader />
					</div>
				)}
				{!loadingUnreadMessages && (
					<div className='flex flex-col'>
						{filteredUsers.map((user) => (
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
				)}
			</div>
		</div>
	);
}
