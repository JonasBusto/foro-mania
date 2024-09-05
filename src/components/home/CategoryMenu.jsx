import { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { useCategoryAction } from '../../hooks/useCategoryAction';
import { Link, useNavigate } from 'react-router-dom';
import { useTagAction } from '../../hooks/useTagAction';

export const CategoryMenu = () => {
  const { categories } = useCategoryAction();
  const { tags } = useTagAction();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const filteredCategories = categories.filter(
    (categoryActive) => categoryActive.isActive === true
  );
  const filteredTags = tags.map((tag) => {
    return { uid: tag.uid, title: tag.value };
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedTag || selectedCategory) {
      const params = new URLSearchParams();
      if (selectedCategory) {
        params.append('category', selectedCategory.uid);
      }
      if (selectedTag) {
        params.append('tag', selectedTag.uid);
      }
      navigate(`/topic-list?${params.toString()}`);
    }
  }, [selectedCategory, selectedTag, navigate]);

  const categoryTemplate = (option) => (
    <div className='flex items-center p-3 bg-[#1e1e1e] rounded-sm w-full'>
      <div
        className='w-3 h-3 rounded-full'
        style={{ backgroundColor: option.color }}
      ></div>
      <div className='ml-3 w-full'>
        <div className='text-md font-medium text-white'>{option.title}</div>
      </div>
    </div>
  );

  const tagTemplate = (option) => {
    return (
      <div className='flex items-center p-3 bg-[#1e1e1e] rounded-sm w-full'>
        <div className='text-md font-medium text-white w-full'>
          <span className='text-gray-400'>#</span>
          {option.title}
        </div>
      </div>
    );
  };

  return (
    <section className='w-full p-4 rounded-md'>
      <div className='flex flex-col sm:flex-row sm:flex-wrap items-center justify-between w-full max-w-5xl mx-auto gap-4'>
        <Dropdown
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.value)}
          options={filteredCategories}
          optionLabel='title'
          placeholder='Categorías'
          filter
          className='dropdown-category-select bg-[#282828] text-white font-semibold border-0 w-full sm:w-1/4 flex-1'
          itemTemplate={categoryTemplate}
          filterInputAutoFocus
        />
        <Dropdown
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.value)}
          options={filteredTags}
          optionLabel='title'
          placeholder='Tags'
          filter
          className='bg-[#282828] text-white border-0 w-full font-semibold sm:w-1/4 flex-1'
          itemTemplate={tagTemplate}
          filterInputAutoFocus
        />
        <Link
          to='/all-categories'
          className='bg-[#1b95d2] text-center text-white rounded-sm mx-2 p-2 font-semibold hover:bg-[#157ab8] w-full sm:w-28'
        >
          Categorías
        </Link>
        <Link
          to='/topic-list?orderBy=last'
          className='bg-[#1b95d2] text-center text-white rounded-sm mx-2 p-2 font-semibold hover:bg-[#157ab8] w-full sm:w-28'
        >
          Últimos
        </Link>
        <Link
          to='/topic-list?orderBy=top'
          className='bg-[#1b95d2] text-center text-white rounded-sm mx-2 p-2 font-semibold hover:bg-[#157ab8] w-full sm:w-28'
        >
          Top
        </Link>
      </div>
    </section>
  );
};
