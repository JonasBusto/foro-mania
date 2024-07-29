import { Banner } from '../components/home/Banner';
import { CategoryList } from '../components/home/CategoryList';
import { CategoryMenu } from '../components/home/CategoryMenu';
import { TagsList } from '../components/home/TagsList';

export const Home = () => {
  return (
    <section className='bg-[#121212] text-[#e5e5e5]'>
      <Banner />
      <CategoryMenu />
      <div className='flex flex-col md:flex-row w-full pb-5'>
        <CategoryList />
        <TagsList />
      </div>
    </section>
  );
};
