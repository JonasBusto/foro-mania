import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useTopicAction } from '../../hooks/useTopicAction';
import { useAuth } from '../../hooks/useAuth';
import { format } from 'date-fns';
import { useCategoryAction } from '../../hooks/useCategoryAction';
import { TextEditor } from '../../components/topic/TextEditor';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../components/items/Loader';
import { MultiSelect } from 'primereact/multiselect';
import { useTagAction } from '../../hooks/useTagAction';
import { BannerAdversiting } from '../../components/items/BannerAdversiting';
import { STATUS_SLICE_STORE } from '../../helpers/constants';

export const UploadTopic = () => {
  const { id } = useParams();

  const [filterValue, setFilterValue] = useState('');

  const { addTag, tags, statusCreateTag } = useTagAction();

  const {
    topic,
    addTopic,
    updateTopic,
    statusTopic,
    getTopic,
    clearStateCategory,
    statusCreateTopic,
    statusUpdateTopic,
  } = useTopicAction();
  const { categories } = useCategoryAction();
  const { loggedUser } = useAuth();

  const navigate = useNavigate();

  const labelStyle = 'text-white font-semibold mb-2';
  const inputStyle = 'h-8 px-3 outline-none ';
  const errorStyle = 'text-red-300 italic text-sm mt-1';

  let initialValues = {
    title: '',
    categoryId: '',
    content: '',
    userId: loggedUser.uid,
    isActive: true,
    createdAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSX"),
    tagsId: [],
  };

  useEffect(() => {
    if (id) {
      getTopic(id);
    } else {
      clearStateCategory();
    }
  }, []);

  useEffect(() => {
    if (id && topic) {
      if (topic.userId !== loggedUser.uid) {
        navigate('/topic/' + topic.uid);
      }
    }
  }, [topic, id]);

  if (id && topic) {
    initialValues = {
      title: topic.title,
      categoryId: topic.categoryId,
      content: topic.content,
      userId: topic.userId,
      createdAt: topic.createdAt,
      isActive: true,
      tagsId: topic.tagsId,
    };
  }

  if (statusTopic === STATUS_SLICE_STORE.LOADING) {
    return <Loader />;
  }

  return (
    <div className='px-2 lg:px-0 max-w-[80rem] mx-auto pb-20'>
      <div className='pt-3 pb-10'>
        <BannerAdversiting />
      </div>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          let errors = {};

          if (values.title === '') {
            errors.title = 'Requerido';
          }

          if (values.categoryId === '') {
            errors.categoryId = 'Requerido';
          }

          if (values.content === '') {
            errors.content = 'Requerido';
          }

          return errors;
        }}
        onSubmit={(values) => {
          if (id && topic) {
            updateTopic({ topic: values, id });
          } else {
            addTopic(values);
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
          setFieldValue,
        }) => (
          <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-3 max-w-[60rem]  mx-auto'
          >
            <h1 className='text-center text-3xl font-bold text-neutral-200'>
              Nueva Publicación
            </h1>
            <div className='flex flex-col'>
              <label htmlFor='' className={labelStyle}>
                Titulo:
              </label>
              <input
                className={inputStyle}
                name='title'
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                type='text'
              />
              {touched.title && errors.title && (
                <p className={errorStyle}>{errors.title}</p>
              )}
            </div>
            <div className='flex flex-col'>
              <label htmlFor='' className={labelStyle}>
                Categoria:
              </label>
              <select
                className={inputStyle}
                name='categoryId'
                value={values.categoryId}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value=''>Seleccionar</option>
                {id && topic
                  ? categories.map((category) => (
                      <option key={category.uid} value={category.uid}>
                        {category.title}
                      </option>
                    ))
                  : categories
                      .filter(
                        (categoryActive) => categoryActive.isActive === true
                      )
                      .map((category) => (
                        <option key={category.uid} value={category.uid}>
                          {category.title}
                        </option>
                      ))}
              </select>
              {touched.categoryId && errors.categoryId && (
                <p className={errorStyle}>{errors.categoryId}</p>
              )}
            </div>
            <div className='flex flex-col'>
              <label htmlFor='' className={labelStyle}>
                Contenido:
              </label>
              <TextEditor
                value={values.content}
                onChange={(content) => setFieldValue('content', content)}
              />
              {touched.content && errors.content && (
                <p className={errorStyle}>{errors.content}</p>
              )}
            </div>
            <div className='flex flex-col'>
              <label htmlFor='' className={labelStyle}>
                Tags:
              </label>
              <MultiSelect
                className='tags-select p-field h-10 bg-white border border-gray-300 rounded-none w-full'
                name='tagsId'
                value={values.tagsId}
                onChange={(e) => setFieldValue('tagsId', e.value)}
                onBlur={handleBlur}
                filter
                onFilter={(e) => setFilterValue(e.filter)}
                placeholder='Selecciona tags'
                maxSelectedLabels={3}
                options={tags}
                optionLabel='label'
                optionValue='uid'
                emptyFilterMessage={
                  filterValue ? (
                    <div>
                      <p className='text-white'>
                        No se encontraron resultados.
                      </p>
                      <button
                        type='button'
                        disabled={
                          statusCreateTag === STATUS_SLICE_STORE.LOADING
                        }
                        className='bg-blue-900 hover:bg-blue-800 text-white font-semibold duration-200 py-2 px-3 w-auto'
                        onClick={() =>
                          addTag({ value: filterValue, label: filterValue })
                        }
                      >
                        {statusCreateTag === STATUS_SLICE_STORE.LOADING
                          ? 'Cargando'
                          : ` Añadir tag "${filterValue}"`}
                      </button>
                    </div>
                  ) : (
                    'No se encontraron resultados.'
                  )
                }
              />
            </div>
            <div className='text-end'>
              <button
                type='submit'
                disabled={
                  statusCreateTopic === STATUS_SLICE_STORE.LOADING ||
                  statusUpdateTopic === STATUS_SLICE_STORE.LOADING
                }
                className='bg-blue-900 hover:bg-blue-800 text-white font-semibold duration-200 py-2 px-3 w-40'
              >
                {id
                  ? statusUpdateTopic === STATUS_SLICE_STORE.LOADING
                    ? 'Cargando'
                    : 'Cargar'
                  : statusCreateTopic === STATUS_SLICE_STORE.LOADING
                  ? 'Cargando'
                  : 'Cargar'}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
