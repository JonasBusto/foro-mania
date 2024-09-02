import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useFavoriteAction } from '../../hooks/useFavoriteAction';
import { useTopicAction } from '../../hooks/useTopicAction';
import { TopicListTopic } from '../topic/TopicListTopic';
import useDocTitle from '../../hooks/useDocTitle';

export function MyAccount() {
  const { loggedUser, logout } = useAuth();
  const { favorites } = useFavoriteAction();
  const { topics } = useTopicAction();

  const favoritesFiltered = favorites.filter(
    (favorite) => favorite.userId === loggedUser?.uid
  );

  const topicsFilteredByUser = topics.filter((topic) =>
    favoritesFiltered.some((favorite) => favorite.contentId === topic.uid)
  );

  useDocTitle('ForoManía | Mi cuenta');

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
        <div className='mt-6 flex flex-wrap flex-row items-start space-x-8'>
          <img
            className='object-cover w-32 h-32 p-1 rounded-full ring-2 ring-[#61dafb]'
            src={loggedUser.photoProfile}
            alt='Foto perfil'
            draggable={false}
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
            className='py-2 px-5 text-sm font-medium text-[#61dafb] bg-[#282828] hover:bg-[#383838] focus:outline-none rounded-sm border border-[#61dafb] focus:ring-4 focus:ring-[#61dafb]'
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
      <div className='w-full max-w-2xl mt-14 mx-auto p-6'>
        <div>
          <h2 className='text-[6vw] mb-4 sm:mb-0 leading-8 sm:leading-none sm:text-[25px] font-bold text-white'>
            Mis publicaciones guardadas
          </h2>
        </div>
        <div>
          <div className='hidden md:flex text-center mt-5 border-b-2 border-neutral-500 align-middle leading-4 pb-4 mb-6'>
            <p className='md:w-9/12 text-start text-white'>Titulo</p>
            <p className='md:w-4/12 text-start text-white'>Usuarios</p>
          </div>
          {topicsFilteredByUser.length > 0 ? (
            topicsFilteredByUser.map((item, i) => (
              <TopicListTopic topic={item} key={i} type='account' />
            ))
          ) : (
            <p className='text-white'>No guardaste ninguna publicación</p>
          )}
        </div>
      </div>
    </div>
  );
}
