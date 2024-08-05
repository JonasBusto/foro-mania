import React from 'react';
import { Formik } from 'formik';
import { format } from 'date-fns';
import { useCommentAction } from '../../hooks/useCommentAction';
import { TextEditor } from '../../components/topic/TextEditor';

const AddCommentForm = ({ loggedUser, topic }) => {
  const { addComment } = useCommentAction();

  const errorStyle = 'text-red-500 italic text-sm mt-1';

  return (
    <div className='p-4 rounded-lg shadow-md'>
      <h3 className='text-white text-lg mb-4'>Agregar comentario:</h3>
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
          <form onSubmit={handleSubmit} className='form-comment'>
            <TextEditor
              value={values.content}
              onChange={(content) => setFieldValue('content', content)}
              className='bg-gray-800 text-white border border-gray-700 rounded-lg'
            />
            {touched.content && errors.content && (
              <p className={errorStyle}>{errors.content}</p>
            )}
            <div className='text-end mt-4'>
              <button
                type='submit'
                className='text-white bg-[#1b95d2] hover:bg-[#157ab8] px-4 py-2 rounded'
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
