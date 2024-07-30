import { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Tags } from '../../helpers/Tags';
import { useCategoryAction } from '../../hooks/useCategoryAction';
import { Link } from 'react-router-dom';

export const CategoryMenu = () => {
  const { categories } = useCategoryAction();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  const categoryTemplate = (option) => (
    <div className='flex items-center p-3 bg-[#1e1e1e] rounded-md w-full'>
      <div
        className='w-3 h-3 rounded-full'
        style={{ backgroundColor: option.color }}
      ></div>
      <div className='ml-3 w-full'>
        <div className='text-md font-medium text-white'>{option.title}</div>
        <p className='text-sm text-gray-400'>{option.description}</p>
      </div>
    </div>
  );

  const tagTemplate = (option) => (
    <div className='flex items-center p-3 bg-[#1e1e1e] rounded-md w-full'>
      <div className='text-md font-medium text-white w-full'>{option.tag}</div>
    </div>
  );

  return (
    <section className='w-full p-4 rounded-md'>
      <div className='flex flex-col sm:flex-row sm:flex-wrap items-center justify-between w-full max-w-5xl mx-auto gap-4'>
        <Dropdown
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.value)}
          options={categories}
          optionLabel='title'
          placeholder='Categorías'
          filter
          className='dropdown-category-select bg-[#282828] border-[#61dafb] text-white border-2 rounded-md w-full sm:w-1/4 flex-1'
          itemTemplate={categoryTemplate}
          filterInputAutoFocus
        />
        <Dropdown
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.value)}
          options={Tags}
          optionLabel='tag'
          placeholder='Tags'
          filter
          className='bg-[#282828] border-[#61dafb] text-white border-2 rounded-md w-full sm:w-1/4 flex-1'
          itemTemplate={tagTemplate}
          filterInputAutoFocus
        />
        <Link
          to='/'
          className='bg-[#1b95d2] text-center text-white rounded-md m-2 p-2 font-semibold hover:bg-[#157ab8] w-full sm:w-28'
        >
          Categorías
        </Link>
        <Link
          to='/'
          className='bg-[#1b95d2] text-center text-white rounded-md m-2 p-2 font-semibold hover:bg-[#157ab8] w-full sm:w-28'
        >
          Últimos
        </Link>
        <Link
          to='/'
          className='bg-[#1b95d2] text-center text-white rounded-md m-2 p-2 font-semibold hover:bg-[#157ab8] w-full sm:w-28'
        >
          Top
        </Link>
      </div>
    </section>
  );
};
