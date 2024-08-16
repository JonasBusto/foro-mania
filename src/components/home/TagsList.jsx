import { Link } from 'react-router-dom';
import { useTopicAction } from '../../hooks/useTopicAction';
import { TopicListTopic } from '../../pages/topic/TopicListTopic';

export const TagsList = () => {
  const { topics } = useTopicAction();
  const filteredTopics = topics.filter((topic) => topic.isActive).slice(0, 6);

  return (
    <section className='w-full md:w-1/2 p-4'>
      <h1 className='text-3xl font-bold mb-5 text-white'>
        Últimas publicaciones
      </h1>
      <div className='flex flex-col gap-1'>
        {Array.isArray(filteredTopics) && filteredTopics.length > 0 ? (
          filteredTopics.map((topic) => (
            <TopicListTopic topic={topic} key={topic.uid} type='home' />
          ))
        ) : (
          <div>
            <p className='text-white text'>No hay publicaciones para mostrar</p>
          </div>
        )}
      </div>
      <div className='mt-6 flex justify-end'>
        <Link
          to='/topic-list'
          className='bg-[#1b95d2] text-center text-white rounded-md m-2 p-2 font-semibold hover:bg-[#157ab8] w-full sm:w-28'
        >
          Ver mas
        </Link>
      </div>
    </section>
  );
};
