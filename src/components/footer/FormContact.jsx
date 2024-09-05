import { Dialog } from 'primereact/dialog';
import { Formik } from 'formik';
import { sendMessageContact } from '../../helpers/contact';
import { useState } from 'react';

export function FormContact({ visible, onHide }) {
  const [loadingForm, setLoadingForm] = useState(false);

  let initialValues = {
    email: '',
    message: '',
  };

  const sendMessage = async (values, resetForm) => {
    setLoadingForm(true);
    const res = await sendMessageContact(values, resetForm);

    if (res.status == 200) {
      alert('Consulta enviada correctamente');
      resetForm();
    } else {
      alert('Error al enviar el mensaje');
    }

    setLoadingForm(false);
  };

  return (
    <div className='flex justify-center items-center'>
      <Dialog
        visible={visible}
        modal
        onHide={() => {
          onHide();
          reset();
        }}
        className='custom-dialog'
        contentStyle={{
          width: '100%',
          backgroundColor: '#191414',
          borderRadius: '0.5rem',
          padding: '20px',
        }}
      >
        <div className='flex flex-col px-3 py-5 gap-4 items-center justify-center w-full'>
          <p className='font-bold text-3xl text-white'>
            Formulario de contacto
          </p>
          <p className='font-semibold mb-3 text-gray-400 text-center'>
            Envia tu consulta o sugerencia y te responderemos a la brevedad!
          </p>
          <Formik
            initialValues={initialValues}
            validate={(values) => {
              let errors = {};

              if (values.message.trim() === '') {
                errors.message = 'Requerido';
              }

              if (values.email.trim() === '') {
                errors.email = 'Requerido';
              } else if (
                !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                  values.email
                )
              ) {
                errors.email = 'Dirección de Email invalida';
              }

              return errors;
            }}
            onSubmit={(values, { resetForm }) => {
              sendMessage(values, resetForm);
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
              <form onSubmit={handleSubmit} className='w-full form-contact'>
                <div className='mb-4'>
                  <label
                    className='block text-gray-300 text-sm font-bold mb-2'
                    htmlFor='email'
                  >
                    Email
                  </label>
                  <input
                    className='border p-2 w-full bg-[#1b1b1b] text-white placeholder-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#61dafb]'
                    type='text'
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.email && errors.email && (
                    <p className='text-xs text-red-500 font-semibold'>
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className='mb-4'>
                  <label
                    className='block text-gray-300 text-sm font-bold mb-2'
                    htmlFor='message'
                  >
                    Descripción
                  </label>
                  <textarea
                    className='border p-2 w-full bg-[#1b1b1b] text-white placeholder-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#61dafb] min-h-20'
                    name='message'
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.message && errors.message && (
                    <p className='text-xs text-red-500 font-semibold'>
                      {errors.message}
                    </p>
                  )}
                </div>
                <div className='flex flex-row items-center justify-around'>
                  <button
                    type='submit'
                    className='w-44 mb-2 bg-[#1b95d2] hover:bg-[#157ab8] hover:border-[#157ab8] text-white py-2 px-4 rounded-sm focus:outline-none focus:shadow-outline border border-[#1b95d2]'
                    disabled={loadingForm}
                  >
                    {loadingForm ? 'Cargando' : 'Enviar'}
                  </button>
                  <button
                    onClick={() => {
                      onHide();
                    }}
                    className='w-44 mb-2 text-center py-2 px-4 text-[#61dafb] bg-[#282828] hover:bg-[#383838] focus:outline-none rounded-sm border border-[#61dafb] focus:ring-4 focus:ring-[#61dafb]'
                    disabled={loadingForm}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </Dialog>
    </div>
  );
}
