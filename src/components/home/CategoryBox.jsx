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
          className='flex flex-col lg:flex-row py-2 h-auto sm:h-36 lg:h-28 lg:items-center px-4 justify-between bg-[#2e2e2e] border-l-4 mx-2'
          style={{ borderLeft: `10px solid ${category.color}` }}
        >
          <div className='w-full sm:w-3/5'>
            <p className='text-lg font-semibold text-white'>{category.title}</p>
            <p className='text-sm  text-gray-300 leading-4 lg:leading-normal'>
              {category.description}
            </p>
          </div>
          <div>
            <p className='text-neutral-300 text-end'>
              {numOfTopics} tema{numOfTopics !== 1 && 's'} creado
              {numOfTopics !== 1 && 's'}
            </p>
          </div>
        </Link>
      ) : (
        <Link
          to={`/topic-list?category=${category.uid}`}
          className='flex flex-col h-auto py-3 sm:py-0 sm:h-28 lg:h-24 items-start px-4 justify-center bg-[#2e2e2e] border-l-4'
          style={{ borderLeft: `10px solid ${category.color}` }}
        >
          <div className='flex flex-col'>
            <p className='lg:text-lg font-semibold text-white'>
              {category.title}
            </p>
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
