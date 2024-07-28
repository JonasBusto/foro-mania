export const Banner = () => {
  return (
    <section>
      <div className='flex flex-row flex-wrap items-center justify-center py-5 '>
        <img
          src='/img/banner.jpg'
          alt='img-advertising'
          className='w-5/6 max-h-25 object-cover border-3 bg-slate-300 border-black h-[15vh] rounded-md'
        />
      </div>
    </section>
  );
};
