import { useAuth } from '../../hooks/useAuth';

export function UserProfile() {
  const { loggedUser, logout } = useAuth();

  return (
    <div className='p-4 md:p-8 bg-gray-50 dark:bg-gray-900'>
      <div className='w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
        <h2 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>
          Perfil Público
        </h2>

        <div className='mt-6 flex flex-col items-center sm:flex-row sm:items-start sm:space-x-8'>
          <img
            className='object-cover w-32 h-32 p-1 rounded-full ring-2 ring-indigo-500'
            src={loggedUser.photoProfile}
            alt='Foto perfil'
          />

          <div className='mt-4 sm:mt-0 sm:ml-8 space-y-4'>
            <div className='text-gray-900 dark:text-gray-100'>
              <div className='flex flex-col space-y-4'>
                <div>
                  <p className='text-sm font-medium text-gray-900 dark:text-white'>
                    Nombre completo
                  </p>
                  <p className='text-gray-600 dark:text-gray-300'>
                    {loggedUser.fullName}
                  </p>
                </div>

                <div>
                  <p className='text-sm font-medium text-gray-900 dark:text-white'>
                    Email
                  </p>
                  <p className='text-gray-600 dark:text-gray-300'>
                    {loggedUser.email}
                  </p>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-900 dark:text-white'>
                    Rol
                  </p>
                  <p className='text-gray-600 dark:text-gray-300'>
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
            className='py-2 px-5 text-sm font-medium text-red-600 bg-white hover:bg-red-100 focus:outline-none rounded-lg border border-red-300 focus:ring-4 focus:ring-red-300'
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}
