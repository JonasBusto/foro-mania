import { Link } from 'react-router-dom';
import { useCategoryAction } from '../../hooks/useCategoryAction';

export const CategoryList = () => {
  const { categories } = useCategoryAction();

  return (
    <section className='w-full md:w-1/2 p-4'>
      <h1 className='text-3xl font-bold mb-5'>Categorías</h1>
      <div className='flex flex-col space-y-1'>
        {categories &&
          categories.map((category, index) => (
            <Link
              to=''
              key={index}
              className='flex flex-col items-start p-4 bg-[#2e2e2e] border-l-4'
              style={{ borderLeft: `10px solid ${category.color}` }}
            >
              <div className='flex flex-col'>
                <p className='text-lg font-semibold text-white'>
                  {category.title}
                </p>
                <p className='text-sm text-gray-300'>{category.description}</p>
              </div>
              <div className='mt-4 text-gray-800 font-semibold'>
                {category.topics}
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
};
