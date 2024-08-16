import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { useAuth } from '../../hooks/useAuth';
import { useChatAction } from '../../hooks/useChatAction';
import { UsersListDesktop } from './UsersListDesktop';
import { ChatDesktop } from './ChatDesktop';

export const ChatsDesktop = ({ user: initialUser, onClose }) => {
	const [selectedUser, setSelectedUser] = useState(initialUser || '');
	const [chatId, setChatId] = useState(null);
	// const [displayDialog, setDisplayDialog] = useState(false);
	const { loggedUser } = useAuth();
	const { clearChatMessages, findOrCreateChat } = useChatAction();

	useEffect(() => {
		if (initialUser) {
			setSelectedUser(initialUser);
			const fetchChatId = async () => {
				const user1Id = loggedUser.uid;
				const chatId = await findOrCreateChat(user1Id, initialUser.uid);
				setChatId(chatId);
				// setDisplayDialog(true);
			};
			fetchChatId();
		}
	}, [initialUser, findOrCreateChat]);

	const handleSelectUser = async (user) => {
		setSelectedUser(user);
		const user1Id = loggedUser.uid;
		const chatId = await findOrCreateChat(user1Id, user.uid);
		setChatId(chatId);
		// setDisplayDialog(true);
	};


	const handleClearChat = async () => {
		if (chatId) {
			await clearChatMessages(chatId);
		}
	};

	return (
		<div>
			<div className='flex border border-neutral-600 h-[35rem]'>
				<div className='border-e border-neutral-600'>
					<UsersListDesktop onSelectUser={handleSelectUser} selectedUser={selectedUser} />
				</div>
				<div className='w-full flex flex-col '>
					{selectedUser !== '' && <div className='flex items-center justify-between p-2 border-b border-neutral-700 '>
						<div>
							<h2 className='text-neutral-200 text-lg font-semibold'>Chat con {selectedUser.fullName}</h2>
						</div>
						<Button
							label='Vaciar Chat'
							icon='pi pi-trash'
							onClick={handleClearChat}
							className='p-button-danger p-button-text font-semibold border-2 border-red-600 hover:bg-red-600 text-white p-2 text-xs rounded'
						/>
					</div>
					}


					<div className='flex '>
						<ChatDesktop selectedUser={selectedUser} chatId={chatId} />
					</div>
				</div>

			</div>

		</div>
	);
};
