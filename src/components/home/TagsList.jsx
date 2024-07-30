import { Link } from 'react-router-dom';
import { Tags } from '../../helpers/Tags';

export const TagsList = () => {
  return (
    <section className='w-full md:w-1/2 p-4'>
      <h1 className='text-3xl font-bold mb-5 text-white'>
        Últimas publicaciones
      </h1>
      <div className='flex flex-col space-y-4'>
        {Tags &&
          Tags.map((tag, index) => (
            <Link
              to=''
              key={index}
              className='flex items-start p-4 bg-[#1e1e1e] rounded-lg border-l-4'
              style={{ borderLeft: `10px solid ${tag.color}` }}
            >
              <div className='flex items-center w-full'>
                {tag.img && (
                  <img
                    src={tag.img}
                    alt='Tag'
                    width={40}
                    className='mr-4 rounded-full w-14 h-14 object-cover'
                  />
                )}
                <div className='flex flex-col flex-grow'>
                  <p className='text-gray-400 text-[9px] leading-tight'>
                    {'Pedrito (email@email.com)'}
                  </p>
                  <h3 className='m-0 text-xl font-semibold text-white'>
                    {'Titulo de la publicación'}
                  </h3>
                  <div className='flex items-center mt-2 text-gray-400'>
                    <div className={'w-3 h-3 rounded-full ' + tag.color}></div>
                    <p className='text-sm ml-2'>{tag.category}</p>
                  </div>
                </div>
                <div className='flex flex-col text-right text-gray-300'>
                  <p className='text-sm'>Respuestas Nº</p>
                  <p className='text-sm'>Último post Date</p>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <div className='mt-10 flex justify-end'>
        <Link
          to='/topics'
          className='bg-[#1b95d2] text-center text-white rounded-md m-2 p-2 font-semibold hover:bg-[#157ab8] w-full sm:w-28'
        >
          Ver mas
        </Link>
      </div>
    </section>
  );
};
