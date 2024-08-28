import { Link } from 'react-router-dom';
import { useTopicAction } from '../../hooks/useTopicAction';

export const CategoryBox = ({ category, showFull = false }) => {
  const { topics } = useTopicAction();

  const data = topics.filter((topic) => category.uid === topic.categoryId);
  let numOfTopics = data.length;

  return (
    <>
      {showFull ? (
        <Link
          to={`/topic-list?category=${category.uid}`}
          className='flex flex-col sm:h-36 lg:h-24 items-center px-4 justify-center bg-[#2e2e2e] border-l-4 mx-2'
          style={{ borderLeft: `10px solid ${category.color}` }}
        >
          <div className='flex flex-wrap sm:flex-nowrap items-center justify-between gap-6 w-full'>
            <div className='w-5/5 sm:w-3/5'>
              <p className='text-lg font-semibold text-white'>
                {category.title}
              </p>
              <p className='text-sm text-gray-300 leading-4 lg:leading-normal'>
                {category.description}
              </p>
            </div>
            <div className='text-neutral-300 text-end'>
              <p>
                {numOfTopics} tema{numOfTopics !== 1 && 's'} creado
                {numOfTopics !== 1 && 's'}
              </p>
            </div>
          </div>
          <div className=' text-gray-800 font-semibold'>{category.topics}</div>
        </Link>
      ) : (
        <Link
          to={`/topic-list?category=${category.uid}`}
          className='flex flex-col h-24 items-start px-4 justify-center bg-[#2e2e2e] border-l-4'
          style={{ borderLeft: `10px solid ${category.color}` }}
        >
          <div className='flex flex-col'>
            <p className='text-lg font-semibold text-white'>{category.title}</p>
            <p className='text-sm text-gray-300 leading-4 lg:leading-normal'>
              {category.description}
            </p>
          </div>
          <div className=' text-gray-800 font-semibold'>{category.topics}</div>
        </Link>
      )}
    </>
  );
};
