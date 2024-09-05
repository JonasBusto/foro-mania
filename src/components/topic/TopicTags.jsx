import { Link } from 'react-router-dom';

export function TopicTags({ tags }) {
  return (
    <div className='flex items-center flex-wrap'>
      {tags.map((tag) => (
        <Link
          to={`/topic-list?tag=${tag.uid}`}
          key={tag.uid}
          className='mt-2 bg-[#252525] hover:bg-[#313131] text-sm border text-neutral-300 border-neutral-600 duration-200 me-2 px-2 rounded-full'
        >
          <p className='text-[14px]'>{'#' + tag.label}</p>
        </Link>
      ))}
    </div>
  );
}
