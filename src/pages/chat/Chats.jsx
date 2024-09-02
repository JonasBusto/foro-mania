import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Chat } from './Chat';
import { useAuth } from '../../hooks/useAuth';
import { UsersList } from './UsersList';
import { useChatAction } from '../../hooks/useChatAction';

export const Chats = ({
  user: initialUser,
  onClose,
  activeFromDetailUser = false,
  chatIdProp = null,
}) => {
  const [selectedUser, setSelectedUser] = useState(initialUser || null);
  const [chatId, setChatId] = useState(chatIdProp);
  const [displayDialog, setDisplayDialog] = useState(activeFromDetailUser);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const { loggedUser } = useAuth();
  const { clearChatMessages, findOrCreateChat } = useChatAction();

  const handleSelectUser = async (user) => {
    setSelectedUser(user);
    const user1Id = loggedUser.uid;
    const user2Id = user.uid;
    const chatId = await findOrCreateChat(user1Id, user2Id);
    setChatId(chatId);
    setDisplayDialog(true);
  };

  const handleHideDialog = () => {
    if (onClose) onClose();
    setSelectedUser(null);
  };

  const handleOpenDialog = () => {
    setVisibleDelete(true);
  };

  const handleClearChat = async () => {
    if (chatId) {
      await clearChatMessages(chatId);
      setVisibleDelete(false);
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
                onClick={() => handleOpenDialog()}
                className='p-button-danger p-button-text font-semibold bg-red-600 text-white m-2 p-2 rounded-sm'
              />
            </div>
          }
          onHide={handleHideDialog}
        >
          <Chat user2={selectedUser} chatId={chatId} />
        </Dialog>
      )}
      <Dialog
        header='Vaciar Mensajes de Chat'
        visible={visibleDelete}
        style={{ width: '50vw' }}
        onHide={() => {
          if (!visibleDelete) return;
          setVisibleDelete(false);
        }}
      >
        <p>¿Está seguro que desea vaciar el chat?</p>
        <div className='flex justify-between mt-10'>
          <button
            className='text-white bg-[#1b95d2] hover:bg-[#157ab8] px-4 py-2 rounded-sm'
            onClick={() => setVisibleDelete(false)}
          >
            Cancelar
          </button>
          <button
            className='text-white bg-[#db1818] hover:bg-[#db1818c4] px-4 py-2 rounded-sm'
            onClick={() => handleClearChat()}
          >
            Confirmar
          </button>
        </div>
      </Dialog>
    </>
  );
};
