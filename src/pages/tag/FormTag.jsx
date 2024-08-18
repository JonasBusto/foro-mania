import { Link, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { Loader } from '../../components/items/Loader';
import { useTagAction } from '../../hooks/useTagAction';

export function FormTag() {
  const { id } = useParams();

  const {
    tag,
    getTag,
    clearStateTag,
    statusTag,
    statusCreateTag,
    statusUpdateTag,
    addTag,
    updateTag,
  } = useTagAction();

  let initialValues = {
    value: '',
    label: '',
  };

  useEffect(() => {
    if (id) {
      getTag({ id });
    } else {
      clearStateTag();
    }
  }, []);

  if (id && tag) {
    initialValues = {
      value: tag.value,
      label: tag.label,
    };
  }

  if (id) {
    if (statusTag === 'Inactivo' || statusTag === 'Cargando') {
      return <Loader />;
    }
  }

  return (
    <div className='m-10'>
      <div className='w-full max-w-screen-md mx-auto '>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            let errors = {};

            if (values.label.trim() === '') {
              errors.label = 'Requerido';
            }

            return errors;
          }}
          onSubmit={(values) => {
            values.value = values.label;
            if (id && tag) {
              updateTag({ tag: values, id });
            } else {
              addTag(values, true);
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
              <p className='font-bold text-center uppercase text-xl mb-7'>
                {id ? 'Modificar Tag' : 'Cargar Tag'}
              </p>
              <div className='mb-4'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='value'
                >
                  Nombre
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  type='text'
                  name='label'
                  value={values.label}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.label && errors.label && (
                  <p className='text-xs text-red-500 font-semibold'>
                    {errors.label}
                  </p>
                )}
              </div>
              <div className='flex flex-row items-center justify-around'>
                <button
                  className=' mb-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  type='submit'
                  disabled={
                    id
                      ? statusUpdateTag === 'Cargando'
                      : statusCreateTag === 'Cargando'
                  }
                >
                  {id
                    ? statusUpdateTag === 'Cargando'
                      ? 'Cargando'
                      : 'Cargar'
                    : statusCreateTag === 'Cargando'
                    ? 'Cargando'
                    : 'Cargar'}
                </button>
                <Link
                  className='mb-2 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  to='/tags'
                  type='button'
                >
                  Cancelar
                </Link>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
