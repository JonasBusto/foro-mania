import { lastTopicExtract } from '../../helpers/Actions';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { TopicListTopic } from '../../pages/topic/TopicListTopic';

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
          <TopicListTopic key={topic.uid} topic={topic} />
        ))
      ) : (
        <p className='text-center'>Sin publicaciones realizadas</p>
      )}
    </>
  );
};
