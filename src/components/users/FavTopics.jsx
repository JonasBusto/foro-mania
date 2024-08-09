import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

export const FavTopics = ({ userProps }) => {
  const { email, fullName } = userProps;

  const favTopics = false;

  const fechaCreacion = (fecha) => {
    const date = parseISO(fecha);
    return format(date, "EEEE d 'de' MMMM 'de' yyyy", { locale: es });
  };

  return (
    <>
      {favTopics ? (
        favTopics.map((topic) => (
          <Link
            key={topic.id}
            to={`/topic/${topic.id}`}
            className='flex items-start p-4 bg-[#1e1e1e] rounded-lg border-l-4 w-full'
            style={{ borderLeft: `10px solid white` }}
          >
            <div className='flex items-center w-full'>
              <div className='flex flex-col flex-grow'>
                <p className='text-gray-400 text-[9px] leading-tight'>
                  {`${fullName} (${email})`}
                </p>
                <h3 className='m-0 text-xl font-semibold text-white'>
                  {topic.title}
                </h3>
                <div className='flex items-center mt-2 text-gray-400'>
                  <div className={'w-3 h-3 rounded-full ' + topic.color}></div>
                  <p className='text-sm ml-2'>{topic.category}</p>
                </div>
              </div>
              <div className='flex flex-col text-right text-gray-300'>
                <p className='text-sm'>{fechaCreacion(topic.createdAt)}</p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className='text-center'>No hay favoritos en tu lista</p>
      )}
    </>
  );
};
