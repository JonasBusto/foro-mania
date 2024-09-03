import { Link } from 'react-router-dom';
import { arrayGifError404 } from '../helpers/error404';

export function Error404() {
  const indexRandom = Math.floor(Math.random() * arrayGifError404.length);
  const gifSelected = arrayGifError404[indexRandom];

  return (
    <div className='text-white flex flex-col justify-center items-center mb-28'>
      <span className='mt-3 text-[12vw] sm:text-[45px] uppercase font-bold'>
        Error 404
      </span>
      <span className='text-gray-300 text-center font-lg text-xl mb-3'>
        Ups. Algo salio Mal. Esta dirección es invalida
      </span>
      <img
        src={gifSelected}
        alt='Gif Error 404'
        className='object-cover w-[80vw] sm:w-[400px] sm:h-[250px] rounded-lg'
      />
      <Link
        className='mt-5 text-white rounded-sm text-sm bg-[#1b95d2] hover:bg-[#157ab8] duration-200 px-2 py-2 md:px-4 mr-3 xs:mr-4 md:mr-0 md:text-base'
        to='/'
      >
        Volver al inicio
      </Link>
    </div>
  );
}
