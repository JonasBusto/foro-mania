export function TopicTags({ tags }) {
  return (
    <div className='flex items-center flex-wrap'>
      {tags.map((tag) => (
        <div key={tag.uid} className='mt-2 bg-slate-500 me-2 px-2 rounded-md'>
          <p>{'#' + tag.label}</p>
        </div>
      ))}
    </div>
  );
}
