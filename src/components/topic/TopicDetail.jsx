import { formatDistanceToNow, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Link } from 'react-router-dom';

const TimeToNow = (fecha) => {
  const fechaISO = parseISO(fecha);
  return formatDistanceToNow(fechaISO, { locale: es });
};

export function CreatedBy({ topic, user }) {
  return (
    <div className='text-center me-4 flex flex-col items-center justify-center'>
      <p className='text-gray-500 font-bold uppercase text-[12px]'>Creado</p>
      <div className='flex items-center justify-center'>
        <Link to={'/users-view/' + user?.uid + '/summary'}>
          <img
            src={user.photoProfile}
            alt='Imagen de usuario'
            className='w-8 h-8 me-2 object-cover rounded-full border-2 border-gray-600'
          />
        </Link>
        <p className='text-[15px] font-semibold'>
          {TimeToNow(topic.createdAt)}
        </p>
      </div>
    </div>
  );
}

export function LastAnswer({ lastCommentUser, lastComment, query = '' }) {
  return (
    <div
      className={`${query} flex-col text-center me-4 items-center justify-center`}
    >
      <p className='text-gray-500 font-bold uppercase text-[12px]'>
        Ultima respuesta
      </p>
      <div className='flex items-center justify-center'>
        <Link to={'/users-view/' + lastCommentUser?.uid + '/summary'}>
          <img
            src={lastCommentUser?.photoProfile}
            alt='Imagen de usuario'
            className='w-8 h-8 me-2 object-cover rounded-full border-2 border-gray-600'
          />
        </Link>
        <p className='text-[15px] font-semibold'>
          {TimeToNow(lastComment.createdAt)}
        </p>
      </div>
    </div>
  );
}

export function CountAllAnswers({ allComments, query = '' }) {
  return (
    <div
      className={`${query} text-center me-4 flex-col items-center justify-center`}
    >
      <p className='text-[18px] font-bold'>{allComments.length}</p>
      <p className='text-gray-500 font-bold uppercase text-[12px]'>
        Respuestas
      </p>
    </div>
  );
}

export function CountFavoritesOfTopic({ favorites, topic, query = '' }) {
  return (
    <div
      className={`${query} text-center me-4 flex-col items-center justify-center`}
    >
      <p className='text-[18px] font-bold'>
        {
          favorites.filter((favorite) => favorite.contentId === topic.uid)
            .length
        }
      </p>
      <p className='text-gray-500 font-bold uppercase text-[12px]'>Guardados</p>
    </div>
  );
}

export function CountLikesOfTopic({ content, query = '' }) {
  return (
    <div
      className={`${query} text-center me-4 flex flex-col items-center justify-center`}
    >
      <p className='text-[18px] font-bold'>
        {content.filter((reaction) => reaction.type === 'like').length}
      </p>
      <p className='text-gray-500 font-bold uppercase text-[12px]'>Me gusta</p>
    </div>
  );
}

export function CountDislikesOfTopic({ content, query = '' }) {
  return (
    <div
      className={`${query} text-center me-4 flex flex-col items-center justify-center`}
    >
      <p className='text-[18px] font-bold'>
        {content.filter((reaction) => reaction.type === 'unlike').length}
      </p>
      <p className='text-gray-500 font-bold uppercase text-[12px]'>
        No Me gusta
      </p>
    </div>
  );
}

export function UsersOfTopic({ user, commentsOfTopicUser }) {
  return (
    <div className='px-2 md:px-4 py-2 md:py-3'>
      <p className='mb-2 text-gray-500 font-bold uppercase text-[12px]'>
        Usuarios Frecuentes
      </p>
      <div className='flex flex-wrap'>
        <Link
          to={'/users-view/' + user?.uid + '/summary'}
          className='me-2 flex items-center'
        >
          <img
            className='w-12 h-12 object-cover rounded-full'
            src={user?.photoProfile}
            alt={user?.fullName}
          />
        </Link>
        {commentsOfTopicUser.map((user) => (
          <Link
            key={user.uid}
            to={'/users-view/' + user?.uid + '/summary'}
            className='me-2 flex items-center'
          >
            <img
              className='w-12 h-12 object-cover rounded-full'
              src={user?.photoProfile}
              alt={user?.fullName}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}