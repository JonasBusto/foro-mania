import { useParams } from 'react-router-dom';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { useCategoryAction } from '../../hooks/useCategoryAction';

export function FormCategory() {
  const { id } = useParams();

  const {
    categories,
    category,
    clearStateCategory,
    getCategory,
    addCategory,
    updateCategory,
    statusCreateCategory,
    statusUpdateCategory,
    statusCategory,
  } = useCategoryAction();

  let initialValues = {
    title: '',
    description: '',
    color: '#ffffff',
  };

  useEffect(() => {
    if (id) {
      getCategory({ id });
    } else {
      clearStateCategory();
    }
  }, []);

  if (id && category) {
    initialValues = {
      title: category.title,
      description: category.description,
      color: category.color,
    };
  }

  if (statusCategory === 'Cargando') {
    return <h1>Cargando...</h1>;
  }

  return (
    <div>
      <div className='w-full max-w-screen-md mx-auto'>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            let errors = {};

            if (values.title.trim() === '') {
              errors.title = 'Requerido';
            }

            if (values.description.trim() === '') {
              errors.description = 'Requerido';
            }

            if (values.color.trim() === '') {
              errors.color = 'Requerido';
            }

            return errors;
          }}
          onSubmit={(values) => {
            if (id && category) {
              updateCategory({ category: values, id });
            } else {
              addCategory(values);
            }
          }}
        >
          {({
            handleSubmit,
            errors,
            touched,
            values,
            handleChange,
            handleBlur,
          }) => (
            <form
              onSubmit={handleSubmit}
              className='bg-white rounded px-8 pt-6 pb-8 mb-4'
            >
              <p className='font-bold text-center uppercase mb-7'>
                Cargar categoria
              </p>
              <div className='mb-4'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='title'
                >
                  Titulo
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  type='text'
                  name='title'
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.title && errors.title && (
                  <p className='text-xs text-red-500 font-semibold'>
                    {errors.title}
                  </p>
                )}
              </div>
              <div className='mb-4'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='description'
                >
                  Descripción
                </label>
                <textarea
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline min-h-15'
                  name='description'
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.description && errors.description && (
                  <p className='text-xs text-red-500 font-semibold'>
                    {errors.description}
                  </p>
                )}
              </div>
              <div className='mb-4'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='color'
                >
                  Color
                </label>
                <input
                  className='p-1 h-10 w-full block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700'
                  type='color'
                  name='color'
                  value={values.color}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.color && errors.color && (
                  <p className='text-xs text-red-500 font-semibold'>
                    {errors.color}
                  </p>
                )}
              </div>
              <div className='flex flex-col items-center justify-between'>
                <button
                  className='w-full mb-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  type='submit'
                  disabled={
                    id
                      ? statusUpdateCategory === 'Cargando'
                      : statusCreateCategory === 'Cargando'
                  }
                >
                  {id
                    ? statusUpdateCategory === 'Cargando'
                      ? 'Cargando'
                      : 'Cargar'
                    : statusCreateCategory === 'Cargando'
                    ? 'Cargando'
                    : 'Cargar'}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
