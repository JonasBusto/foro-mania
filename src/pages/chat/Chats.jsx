import { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Chat } from './Chat';
import { useAuth } from '../../hooks/useAuth';
import { UsersList } from './UsersList';
import { useChatAction } from '../../hooks/useChatAction';

export const Chats = ({ user: initialUser, onClose }) => {
	const [selectedUser, setSelectedUser] = useState(initialUser || null);
	const [chatId, setChatId] = useState(null);
	const [displayDialog, setDisplayDialog] = useState(false);
	const { loggedUser } = useAuth();
	const { clearChatMessages, findOrCreateChat } = useChatAction();

	useEffect(() => {
		if (initialUser) {
			setSelectedUser(initialUser);
			const fetchChatId = async () => {
				const user1Id = loggedUser.uid;
				const chatId = await findOrCreateChat(user1Id, initialUser.uid);
				setChatId(chatId);
				setDisplayDialog(true);
			};
			fetchChatId();
		}
	}, [initialUser, findOrCreateChat]);

	const handleSelectUser = async (user) => {
		setSelectedUser(user);
		const user1Id = loggedUser.uid;
		const chatId = await findOrCreateChat(user1Id, user.uid);
		setChatId(chatId);
		setDisplayDialog(true);
	};

	const handleHideDialog = () => {
		if (onClose) onClose();
		setSelectedUser(null);
	};

	const handleClearChat = async () => {
		if (chatId) {
			await clearChatMessages(chatId);
		}
	};

	return (
		<>
			{!selectedUser ? (
				<UsersList onSelectUser={handleSelectUser} />
			) : (
				<Dialog
					header={`Chat con ${selectedUser.fullName}`}
					headerStyle={{
						backgroundColor: '#282828',
						color: '#fff',
					}}
					visible={displayDialog}
					style={{
						width: '95vw',
						maxHeight: '85vh',
					}}
					contentStyle={{
						backgroundColor: '#282828',
						padding: 10,
						overflowX: 'hidden',
						overflowY: 'auto',
					}}
					footer={
						<div className='bg-[#282828] flex flex-row items-center justify-center'>
							<Button
								label='Vaciar Chat'
								icon='pi pi-trash'
								onClick={handleClearChat}
								className='p-button-danger p-button-text font-semibold border-2 border-red-600 hover:bg-red-600 text-white m-2 p-2 rounded'
							/>
						</div>
					}
					onHide={handleHideDialog}>
					<Chat user2={selectedUser} chatId={chatId} />
				</Dialog>
			)}
		</>
	);
};
