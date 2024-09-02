import { Link } from 'react-router-dom';

export function TopicTags({ tags }) {
  return (
    <div className='flex items-center flex-wrap'>
      {tags.map((tag) => (
        <Link
          to={`/topic-list?tag=${tag.uid}`}
          key={tag.uid}
          className='mt-2 bg-[#252525] hover:bg-[#313131] me-2 px-3 rounded-sm'
        >
          <p className='text-[15px]'>{'#' + tag.label}</p>
        </Link>
      ))}
    </div>
  );
}
