import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function MyAccount() {
  const { loggedUser, logout } = useAuth();

  return (
    <div className='p-4 md:p-8 bg-[#121212]'>
      <div className='w-full max-w-2xl mx-auto bg-[#282828] rounded-lg shadow-lg p-6'>
        <div className='flex justify-between'>
          <h2 className='text-3xl font-bold text-white'>Mi perfil</h2>
          <Link
            to='/account/edit'
            className='w-8 h-8 bg-[#282828] p-2 rounded-full cursor-pointer hover:bg-[#383838] transition flex justify-center items-center'
          >
            <i className='pi pi-pencil text-white'></i>
          </Link>
        </div>

        <div className='mt-6 flex flex-col items-center sm:flex-row sm:items-start sm:space-x-8'>
          <img
            className='object-cover w-32 h-32 p-1 rounded-full ring-2 ring-[#61dafb]'
            src={loggedUser.photoProfile}
            alt='Foto perfil'
          />

          <div className='mt-4 sm:mt-0 sm:ml-8 space-y-4'>
            <div className='text-white'>
              <div className='flex flex-col space-y-4'>
                <div>
                  <p className='text-sm font-medium'>Nombre completo</p>
                  <p className='text-gray-400'>{loggedUser.fullName}</p>
                </div>

                <div>
                  <p className='text-sm font-medium'>Email</p>
                  <p className='text-gray-400'>{loggedUser.email}</p>
                </div>
                <div>
                  <p className='text-sm font-medium'>Rol</p>
                  <p className='text-gray-400'>
                    {loggedUser.role === 'user' ? 'Usuario' : 'Administrador'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-8 flex justify-end'>
          <button
            type='button'
            onClick={logout}
            className='py-2 px-5 text-sm font-medium text-[#61dafb] bg-[#282828] hover:bg-[#383838] focus:outline-none rounded-lg border border-[#61dafb] focus:ring-4 focus:ring-[#61dafb]'
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}
