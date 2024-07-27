import React, { useState } from 'react';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
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
    <div className='max-w-screen-lg mx-auto p-4'>
      <div className='bg-white rounded px-8 pt-6 pb-8 mb-4'>
        <h2 className='text-2xl font-bold text-center'>Editar perfil</h2>
        <div className='flex flex-col items-center mt-8'>
          <div className='relative'>
            <img
              className='object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300'
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
              className='absolute bottom-0 right-0 w-8 h-8 bg-gray-300 p-2 rounded-full cursor-pointer hover:bg-gray-400 transition flex justify-center items-center'
            >
              <i className='pi pi-pencil'></i>
            </label>
          </div>
          <div className='mt-8 w-full sm:max-w-md'>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='fullName'
              >
                Nombre completo
              </label>
              <input
                id='fullName'
                type='text'
                disabled={userStatusUpdate === 'Cargando'}
                className='w-full p-2 border rounded'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className='flex justify-between'>
              <Link
                to='/account'
                className='py-2 px-5 text-sm font-medium text-red-600 bg-white hover:bg-red-100 focus:outline-none rounded-lg border border-red-300 focus:ring-4 focus:ring-red-300'
              >
                Cancelar
              </Link>
              <button
                type='button'
                disabled={userStatusUpdate === 'Cargando'}
                className='rounded-lg bg-blue-600 px-4 py-2 text-white'
                onClick={() => updateProfile({ fullName, fileImage })}
              >
                {userStatusUpdate === 'Cargando' ? (
                  'Cargando'
                ) : (
                  <>
                    <i className='pi pi-check'>Guardar</i>
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
