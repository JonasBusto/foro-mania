import React, { useState, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { Formik } from 'formik';
import { format } from 'date-fns';

const AddCommentForm = ({ loggedUser, topic }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);



  const errorStyle = 'text-red-300 italic text-sm mt-1'


  const handleEmojiClick = (event, emojiObject) => {
    const cursorPosition = textAreaRef.current.selectionStart;
    const textBeforeCursor = comment.substring(0, cursorPosition);
    const textAfterCursor = comment.substring(cursorPosition);
    setComment(textBeforeCursor + emojiObject.emoji + textAfterCursor);
    setShowEmojiPicker(false);
    textAreaRef.current.focus();
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  return (
    <div className='border border-neutral-700'>
      <div className=''>
        <h3 className='text-lg my-4 ms-4 font-semibold'>Agrega un comentario:</h3>
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
          onClick={toggleEmojiPicker}
          className='pi pi-face-smile text-lg hover:bg-neutral-600 py-2 px-3 duration-200'
        ></button>
        {showEmojiPicker && (
          <div className='absolute bottom-12 left-12'>
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
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
            errors.content = 'No se ingresó conenido'
          }
          return errors
        }}

        onSubmit={(values) => {
          console.log(values);
        }
        }
      >

        {({ handleSubmit, errors, touched, values, handleChange, handleBlur }) => (
          <form onSubmit={handleSubmit}>
            <textarea
              value={values.content}
              name='content'
              onChange={handleChange}
              onBlur={handleBlur}
              className='w-full h-60 resize-none text-neutral-900 p-3 outline-none'
            ></textarea>
            {touched.content && errors.content && <p className={errorStyle}>{errors.content}</p>}
            <div className='text-end p-2'>
              <button type='submit' className='bg-blue-900 hover:bg-blue-800 duration-200 py-2 px-3'>
                Agregar comentario:
              </button>
            </div>
          </form>

        )}

      </Formik>
    </div>
  );
};

export default AddCommentForm;
