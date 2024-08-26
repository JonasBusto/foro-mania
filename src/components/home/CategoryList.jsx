import { useCategoryAction } from '../../hooks/useCategoryAction';
import { CategoryBox } from './CategoryBox';
import { Link } from 'react-router-dom';

export const CategoryList = () => {
  const { categories } = useCategoryAction();

  const limitedCategories = categories.slice(0, 6);

  return (
    <section className='w-full lg:w-1/2 py-4 px-3'>
      <h1 className='text-3xl font-bold mb-5'>Categorías</h1>
      <div className='flex flex-col gap-1'>
        {categories &&
          limitedCategories
            .filter((categoryActive) => categoryActive.isActive === true)
            .map((category, index) => (
              <CategoryBox category={category} key={index} />
            ))}
      </div>
      <div className='mt-6 flex'>
        <Link
          to='/all-categories'
          className='bg-[#1b95d2] text-center text-white rounded-md m-2 p-2 font-semibold hover:bg-[#157ab8] w-full sm:w-28'
        >
          Ver mas
        </Link>
      </div>
    </section>
  );
};
