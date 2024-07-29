import { Banner } from '../components/home/Banner';
import { CategoryList } from '../components/home/CategoryList';
import { CategoryMenu } from '../components/home/CategoryMenu';
import { TagsList } from '../components/home/TagsList';

export const Home = () => {
  return (
    <section>
      <Banner />
      <CategoryMenu />
      <hr className='m-2 h-[2px] bg-slate-300' />
      <div className='flex flex-row flex-wrap items-start justify-around w-full pb-5'>
        <CategoryList />
        <TagsList />
      </div>
    </section>
  );
};
