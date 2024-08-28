import { Link } from 'react-router-dom';

export function TopicTags({ tags }) {
  return (
    <div className='flex items-center flex-wrap'>
      {tags.map((tag) => (
        <Link
          to={`/topic-list?tag=${tag.uid}`}
          key={tag.uid}
          className='mt-2 bg-slate-500 hover:bg-slate-600 me-2 px-3 rounded-[4px]'
        >
          <p>{'#' + tag.label}</p>
        </Link>
      ))}
    </div>
  );
}
