/* eslint-disable react/prop-types */
import { Formik } from 'formik';
import { format } from 'date-fns';
import { useCommentAction } from '../../hooks/useCommentAction';
import { TextEditor } from '../../components/topic/TextEditor';

const AddCommentForm = ({ loggedUser, topic }) => {
  const { addComment } = useCommentAction();

  const errorStyle = 'text-red-300 italic text-sm mt-1';

  return (
    <div className='border border-neutral-700'>
      <div className=''>
        <h3 className='text-lg my-4 ms-4 font-semibold'>
          Agrega un comentario:
        </h3>
      </div>
      <div className='bg-neutral-700 relative'>
        <button
          type='button'
          title='Agrega una imagen'
          className='pi pi-image text-lg hover:bg-neutral-600 py-2 px-3 duration-200'
        ></button>
        <button
          type='button'
          title='Agrega un emoji'
          className='pi pi-face-smile text-lg hover:bg-neutral-600 py-2 px-3 duration-200'
        ></button>
      </div>
      <Formik
        initialValues={{
          topicId: topic.uid,
          content: '',
          userId: loggedUser.uid,
          createdAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSX"),
        }}
        validate={(values) => {
          let errors = {};

          if (values.content === '') {
            errors.content = 'Requerido';
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          addComment(values);
          resetForm();
        }}
      >
        {({ handleSubmit, errors, touched, values, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <TextEditor
              value={values.content}
              onChange={(content) => setFieldValue('content', content)}
            />
            {touched.content && errors.content && (
              <p className={errorStyle}>{errors.content}</p>
            )}
            <div className='text-end p-2'>
              <button
                type='submit'
                className='bg-blue-900 hover:bg-blue-800 duration-200 py-2 px-3'
              >
                Agregar comentario
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddCommentForm;
