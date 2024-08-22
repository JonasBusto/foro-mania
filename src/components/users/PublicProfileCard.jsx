import { useState } from 'react';
import { Chats } from '../../pages/chat/Chats';
import { useAuth } from '../../hooks/useAuth';

export const PublicProfileCard = ({ userProps }) => {
  const { loggedUser } = useAuth();

  const { photoProfile, email, fullName } = userProps;
  const [displayDialog, setDisplayDialog] = useState(false);

  const handleSelectUser = async () => {
    setDisplayDialog(true);
  };

  const handleCloseDialog = () => {
    setDisplayDialog(false);
  };

  return (
    <div className='flex flex-row items-center justify-between'>
      <div className='flex flex-col flex-wrap'>
        <figure>
          <img
            src={photoProfile}
            alt='foto de perfil del usuario'
            className='object-cover w-[120px] h-[120px] p-1 rounded-full ring-2 ring-[#61dafb]'
          />
        </figure>
        <section>
          <h2 className='text-4xl font-bold mt-2'>{fullName}</h2>
          <span className='text-lg text-gray-300'>{email}</span>
        </section>
      </div>
      {loggedUser && loggedUser.uid !== userProps.uid && (
        <div>
          <button
            onClick={handleSelectUser}
            className='bg-[#1b95d2] text-center text-white rounded-md m-2 p-2 font-semibold hover:bg-[#157ab8] w-full'
          >
            <i className='pi pi-comments mr-2'></i>Enviar mensaje
          </button>
        </div>
      )}
      {displayDialog && (
        <Chats
          user={userProps}
          onClose={handleCloseDialog}
          activeFromDetailUser={true}
        />
      )}
    </div>
  );
};
