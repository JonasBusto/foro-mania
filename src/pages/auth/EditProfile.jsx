import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useUserAction } from '../../hooks/useUserAction';
import { Link } from 'react-router-dom';

export const EditProfile = () => {
  const { loggedUser } = useAuth();
  const { updateProfile, userStatusUpdate } = useUserAction();

  const [fullName, setFullName] = useState(loggedUser.fullName);
  const [photoProfile, setPhotoProfile] = useState(loggedUser.photoProfile);
  const [fileImage, setFileImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoProfile(reader.result);
      };
      reader.readAsDataURL(file);
      setFileImage(file);
    }
  };

  return (
    <div className='bg-[#181818] p-4'>
      <div className='max-w-screen-sm mx-auto bg-[#2a2a2a] rounded-lg px-8 pt-6 pb-8 mb-4'>
        <h2 className='text-2xl font-bold text-white text-center'>
          Editar perfil
        </h2>
        <div className='flex flex-col items-center mt-8'>
          <div className='relative'>
            <img
              className='object-cover w-40 h-40 p-1 rounded-full ring-2 ring-[#61dafb]'
              src={photoProfile}
              alt={'Foto de perfil de ' + loggedUser.fullName}
            />
            <input
              type='file'
              accept='image/*'
              id='profilePic'
              className='hidden'
              disabled={userStatusUpdate === 'Cargando'}
              onChange={handleFileChange}
            />
            <label
              htmlFor='profilePic'
              className='absolute bottom-0 right-0 w-8 h-8 bg-[#61dafb] p-2 rounded-full cursor-pointer hover:bg-[#4db1e8] transition flex justify-center items-center'
            >
              <i className='pi pi-pencil text-white'></i>
            </label>
          </div>
          <div className='mt-8 w-full sm:max-w-md'>
            <div className='mb-4'>
              <label
                className='block text-gray-300 text-sm font-bold mb-2'
                htmlFor='fullName'
              >
                Nombre completo
              </label>
              <input
                id='fullName'
                type='text'
                disabled={userStatusUpdate === 'Cargando'}
                className='w-full p-2 border rounded-md bg-[#121212] text-white border-[#61dafb]'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className='flex justify-between'>
              <Link
                disabled={userStatusUpdate === 'Cargando'}
                to='/account'
                className='py-2 px-5 text-sm font-medium text-[#61dafb] bg-[#282828] hover:bg-[#383838] focus:outline-none rounded-lg border border-[#61dafb] focus:ring-4 focus:ring-[#61dafb]'
              >
                Cancelar
              </Link>
              <button
                type='button'
                disabled={userStatusUpdate === 'Cargando'}
                className='rounded-lg bg-[#1b95d2] px-4 py-2 text-white hover:bg-[#157ab8] focus:outline-none'
                onClick={() => updateProfile({ fullName, fileImage })}
              >
                {userStatusUpdate === 'Cargando' ? (
                  'Cargando'
                ) : (
                  <>
                    <i className='pi pi-check'></i>
                    Guardar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
