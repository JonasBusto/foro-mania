import { lastTopicExtract } from '../../helpers/Actions';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

export const UserTopics = ({ userProps, topics }) => {
  const { uid, email, fullName } = userProps;

  const topicsByUserId = lastTopicExtract(uid, topics, true);

  const fechaCreacion = (fecha) => {
    const date = parseISO(fecha);
    return format(date, "EEEE d 'de' MMMM 'de' yyyy", { locale: es });
  };

  return (
    <>
      {topicsByUserId ? (
        topicsByUserId.map((topic) => (
          <Link
            key={topic.uid}
            to={`/topic/${topic.uid}`}
            className='flex items-start p-4 bg-[#1e1e1e] rounded-lg border-l-4 w-full'
          >
            <div className='flex items-center w-full'>
              <div className='flex flex-col flex-grow'>
                <small className='text-gray-400 leading-tight'>
                  {fullName}
                </small>
                <h3 className='m-0 text-xl font-semibold text-white'>
                  {topic.title}
                </h3>
              </div>
              <div className='flex flex-col text-right text-gray-300'>
                <p className='text-sm'>{fechaCreacion(topic.createdAt)}</p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className='text-center'>Todavía no has publicado ningún tópico</p>
      )}
    </>
  );
};
