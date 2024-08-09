import { Formik } from 'formik';
import { format } from 'date-fns';
import { useCommentAction } from '../../hooks/useCommentAction';
import { TextEditor } from '../../components/topic/TextEditor';
import { Loader } from '../../components/items/Loader';

export const UploadComentForm = ({
  loggedUser,
  action,
  topic,
  data,
  setVisible,
}) => {
  const {
    addComment,
    updateComment,
    statusComment,
    statusComments,
    statusUpdateComment,
    statusCreateComment,
  } = useCommentAction();

  const errorStyle = 'text-red-500 italic text-sm mt-1';
  let initialValues;

  if (action === 'create') {
    initialValues = {
      topicId: topic.uid,
      content: '',
      userId: loggedUser.uid,
      createdAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSX"),
    };
  } else {
    initialValues = {
      topicId: data.topicId,
      content: data.content,
      userId: data.userId,
      createdAt: data.createdAt,
    };
  }

  if (statusComment === 'Cargando' || statusComments === 'Cargando') {
    return <Loader />;
  }

  return (
    <div className='p-4 rounded-lg shadow-md'>
      {action === 'create' && (
        <h3 className='text-white text-lg mb-4'>Agregar comentario:</h3>
      )}
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          let errors = {};

          if (values.content === '' || values.content === '<p><br></p>') {
            errors.content = 'Requerido';
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          if (action === 'create') {
            addComment(values, { resetForm });
          } else {
            updateComment(
              { comment: values, id: data.uid },
              { resetForm, setVisible }
            );
          }
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
                disabled={
                  action === 'update'
                    ? statusUpdateComment === 'Cargando'
                    : statusCreateComment === 'Cargando'
                }
                type='submit'
                className='text-white bg-[#1b95d2] hover:bg-[#157ab8] px-4 py-2 rounded'
              >
                {action === 'update'
                  ? statusUpdateComment === 'Cargando'
                    ? 'Cargando'
                    : 'Cargar'
                  : statusCreateComment === 'Cargando'
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
