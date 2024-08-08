import { useCategoryAction } from '../../hooks/useCategoryAction';
import CategoryBox from './CategoryBox';

export const CategoryList = () => {
  const { categories } = useCategoryAction();

  const limitedCategories = categories.slice(0, 6);

  return (
    <section className='w-full md:w-1/2 p-4'>
      <h1 className='text-3xl font-bold mb-5'>Categorías</h1>
      <div className='flex flex-col gap-1'>
        {categories &&
          limitedCategories.map((category, index) => (
            // <Link
            //   to={`/topic-list?category=${category.uid}`}
            //   className='flex flex-col h-24 items-start px-4 justify-center bg-[#2e2e2e] border-l-4'
            //   style={{ borderLeft: `10px solid ${category.color}` }}
            // >
            //   <div className='flex flex-col'>
            //     <p className='text-lg font-semibold text-white'>
            //       {category.title}
            //     </p>
            //     <p className='text-sm text-gray-300 leading-4 lg:leading-normal'>{category.description}</p>
            //   </div>
            //   <div className=' text-gray-800 font-semibold'>
            //     {category.topics}
            //   </div>
            // </Link>
            <CategoryBox category={category} key={index} />
          ))}
      </div>
    </section>
  );
};
