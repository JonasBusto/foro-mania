import { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { useCategoryAction } from '../../hooks/useCategoryAction';
import { Link, useNavigate } from 'react-router-dom';

export const FilterTopic = ({ queryCategory, queryOrder, querySearch }) => {
  const { categories } = useCategoryAction();
  const [selectedCategory, setSelectedCategory] = useState(() => {
    if (querySearch) return null;

    const categoryFromQuery = categories.find(
      (cat) => cat.uid === queryCategory
    );

    return categoryFromQuery || null;
  });

  const navigate = useNavigate();

  useEffect(() => {
    if ((selectedCategory || queryOrder) && !querySearch) {
      const params = new URLSearchParams();
      if (selectedCategory && selectedCategory.uid) {
        params.append('category', selectedCategory.uid);
      }
      if (queryOrder) {
        params.append('orderBy', queryOrder);
      }

      navigate(`/topic-list?${params.toString()}`);
    }
  }, [selectedCategory, queryOrder]);

  const categoryTemplate = (option) => {
    return (
      <div className='flex items-center p-3 bg-[#1e1e1e] rounded-md w-60'>
        <div
          className='w-3 h-3 rounded-full'
          style={{ backgroundColor: option.color }}
        ></div>
        <div className='ml-3 w-full'>
          <div className='text-md font-medium text-white'>{option.title}</div>
        </div>
      </div>
    );
  };

  return (
    <section className='w-full p-4 rounded-md'>
      <div className='flex flex-col sm:flex-row sm:flex-wrap items-center justify-between w-full max-w-5xl mx-auto gap-4'>
        {!querySearch && (
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
        )}

        {(querySearch || queryCategory || queryOrder) && (
          <div
            className={querySearch ? 'mx-auto flex justify-between w-max' : ''}
          >
            {querySearch && (
              <div>
                <p>
                  <strong className='me-2'>Tu busqueda:</strong>
                  {querySearch}
                </p>
              </div>
            )}
            <div>
              <button
                className='ms-3 flex items-center justify-center w-7 h-7'
                onClick={() => {
                  setSelectedCategory(null);
                  navigate('/topic-list');
                }}
              >
                <i className='pi pi-times-circle rounded-full'></i>
              </button>
            </div>
          </div>
        )}

        {!querySearch && (
          <>
            <Link
              to={`/topic-list?category=${selectedCategory?.uid}&orderBy=last`}
              className={`${
                queryOrder === 'last'
                  ? 'bg-[#557e92] pointer-events-none'
                  : 'bg-[#1b95d2] hover:bg-[#157ab8]'
              } text-center text-white rounded-md m-2 p-2 font-semibold  w-full sm:w-28`}
            >
              Últimos
            </Link>
            <Link
              to={`/topic-list?category=${selectedCategory?.uid}&orderBy=top`}
              className={`${
                queryOrder === 'top'
                  ? 'bg-[#557e92] pointer-events-none'
                  : 'bg-[#1b95d2] hover:bg-[#157ab8]'
              }  text-center text-white rounded-md m-2 p-2 font-semibold w-full sm:w-28`}
            >
              Top
            </Link>
          </>
        )}
      </div>
    </section>
  );
};
