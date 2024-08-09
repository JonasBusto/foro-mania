import { useCategoryAction } from '../hooks/useCategoryAction';
import { CategoryBox } from '../components/home/CategoryBox';
import { BannerAdversiting } from '../components/items/BannerAdversiting';
import { Loader } from '../components/items/Loader';

export const CategoriesView = () => {
  const { categories } = useCategoryAction();
console.log(categories);


  if (categories.length === 0) {
    return <Loader />
  }


  // if (categories.length > 0) {
  //   return <Loader />
  // }

  return (
    <div className='bg-neutral-900 h-full py-8'>
      <div className='max-w-[75rem] mx-auto '>
        <div>
          <BannerAdversiting />
        </div>
        <h1 className='text-neutral-100 text-5xl font-bold text-center py-8'>
          Categorías
        </h1>
        <div className='flex flex-col gap-4'>
          {categories.map((category, index) => (
              <CategoryBox category={category} key={index} showFull />
            ))}
        </div>
      </div>
    </div>
  );
};
