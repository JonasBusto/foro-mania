import { useCategoryAction } from '../hooks/useCategoryAction';
import { CategoryBox } from '../components/home/CategoryBox';
import { BannerAdversiting } from '../components/items/BannerAdversiting';
import { Loader } from '../components/items/Loader';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { useLoad } from '../hooks/useLoad';
import useDocTitle from '../hooks/useDocTitle';
import { USER_ROLE } from '../helpers/constants';

export const CategoriesView = () => {
  const { categories } = useCategoryAction();
  const { isLoading } = useLoad();
  const { loggedUser } = useAuth();

  useDocTitle('ForoManía | Categorias');

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='h-full pb-10 pt-3'>
      <div className='max-w-[75rem] mx-auto '>
        <div>
          <BannerAdversiting />
        </div>
        <h1 className='text-neutral-100 text-[10vw] sm:text-5xl font-bold text-center pt-16 pb-0 sm:pb-6'>
          Categorías
        </h1>
        <div className='flex mb-7 flex-row flex-wrap items-center justify-around'>
          {loggedUser?.role === USER_ROLE.ADMINISTRATOR ? (
            <Link
              to='/categories'
              className='text-[#61dafb] p-3 bg-[#282828] hover:bg-[#383838] focus:outline-none rounded-sm border border-[#61dafb]'
            >
              Administrar categorias
            </Link>
          ) : null}
        </div>
        <div className='flex flex-col gap-4'>
          {categories
            .filter((categoryActive) => categoryActive.isActive === true)
            .map((category, index) => (
              <CategoryBox category={category} key={index} showFull />
            ))}
        </div>
      </div>
    </div>
  );
};
