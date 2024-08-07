import { Banner } from '../components/home/Banner';
import { CategoryList } from '../components/home/CategoryList';
import { CategoryMenu } from '../components/home/CategoryMenu';
import { TagsList } from '../components/home/TagsList';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Home = () => {
  const { loggedUser } = useAuth();

  return (
    <section className='bg-[#121212] text-[#e5e5e5]'>
      <Banner />
      <div className='flex flex-col lg:flex-row items-center'>
        {
          loggedUser !== null && <Link
            to='/upload-topic'
            className='bg-red-600 text-center text-white rounded-md m-2 p-2 font-semibold hover:bg-red-700 duration-200 w-[94%] sm:w-52 '
          >
            Nueva Publicación
          </Link>
        }
        <CategoryMenu />
      </div>
      <div className='flex flex-col md:flex-row w-full pb-5'>
        <CategoryList />
        <TagsList />
      </div>
    </section>
  );
};
