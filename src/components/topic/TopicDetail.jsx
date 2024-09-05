import { formatDistanceToNow, formatDistanceStrict, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Link } from 'react-router-dom';

const TimeToNow = (fecha) => {
  const fechaISO = parseISO(fecha);
  const distance = formatDistanceStrict(fechaISO, new Date(), { locale: es });

  const [value, unit] = distance.split(' ');
  const unitShort = unit.charAt(0);

  return `${value}${unitShort}`;
};

const TimeToNowResponsive = (fecha) => {
  const fechaISO = parseISO(fecha);
  return formatDistanceToNow(fechaISO, { locale: es });
};

export function CreatedBy({ topic, user }) {
  return (
    <div className='text-center me-4 flex flex-col items-center justify-center created-by'>
      <div className='flex items-center justify-center'>
        <Link to={'/users-view/' + user?.uid + '/summary'}>
          <img
            src={user.photoProfile}
            alt='Imagen de usuario'
            className=' w-14 h-14 me-2 object-cover rounded-full border-2 border-gray-600'
            draggable={false}
          />
        </Link>
        <div>
          <p className='text-[15px] font-semibold'>
            {TimeToNowResponsive(topic.createdAt)}
          </p>
          <p className='text-gray-500 font-bold uppercase text-[10px] lg:text-[12px]'>Creado</p>
        </div>

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
            draggable={false}
          />
        </Link>
        <p className='text-[15px] font-semibold'>
          <span className='hidden sm:block'>
            {TimeToNowResponsive(lastComment.createdAt)}
          </span>
          <span className='block sm:hidden'>
            {TimeToNow(lastComment.createdAt)}
          </span>
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
      <p className='text-[16px] font-bold'>{allComments.length}</p>
      <p className='text-gray-500 font-bold uppercase text-[10px] lg:text-[12px]'>
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
      <p className='text-[16px] font-bold'>
        {
          favorites.filter((favorite) => favorite.contentId === topic.uid)
            .length
        }
      </p>
      <p className='text-gray-500 font-bold uppercase text-[10px] lg:text-[12px]'>Guardados</p>
    </div>
  );
}

export function CountLikesOfTopic({ content, query = '' }) {
  return (
    <div
      className={`${query} text-center me-4 flex flex-col items-center justify-center`}
    >
      <p className='text-[16px] font-bold'>
        {content.filter((reaction) => reaction.type === 'like').length}
      </p>
      <p className='text-gray-500 font-bold uppercase text-[10px] lg:text-[12px]'>Me gusta</p>
    </div>
  );
}

export function CountDislikesOfTopic({ content, query = '' }) {
  return (
    <div
      className={`${query} text-center me-4 flex flex-col items-center justify-center`}
    >
      <p className='text-[16px] font-bold'>
        {content.filter((reaction) => reaction.type === 'unlike').length}
      </p>
      <p className='text-gray-500 font-bold uppercase text-[10px] lg:text-[12px]'>
        No Me gusta
      </p>
    </div>
  );
}

export function UsersOfTopic({ user, commentsOfTopicUser }) {
  return (
    <div className='px-2 md:px-4 py-2 md:py-3'>
      <p className='mb-2 text-gray-500 font-bold uppercase text-[10px] lg:text-[12px]'>
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
            draggable={false}
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
              draggable={false}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
