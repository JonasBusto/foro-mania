import { useCategoryAction } from '../hooks/useCategoryAction';
import { CategoryBox } from '../components/home/CategoryBox';
import { BannerAdversiting } from '../components/items/BannerAdversiting';
import { Loader } from '../components/items/Loader';

export const CategoriesView = () => {
  const { categories } = useCategoryAction();

  if (categories.length === 0) {
    return <Loader />;
  }

  return (
    <div className='bg-neutral-900 h-full pb-10 pt-3'>
      <div className='max-w-[75rem] mx-auto '>
        <div>
          <BannerAdversiting />
        </div>
        <h1 className='text-neutral-100 text-5xl font-bold text-center pt-16 pb-10'>
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
