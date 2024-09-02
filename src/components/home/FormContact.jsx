import { Dialog } from 'primereact/dialog';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { InputTextarea } from 'primereact/inputtextarea';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

export function FormContact({ visible, onHide }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const fetchImageUrl = async () => {
    try {
      const storage = getStorage();
      const imageRef = ref(storage, '/LOGOHOME.jpg');
      const url = await getDownloadURL(imageRef);
      return url;
    } catch (error) {
      console.error('Error al obtener la URL de la imagen:', error);
      return '';
    }
  };

  const onSubmitForm = async (data) => {
    const templateParams = {
      url: await fetchImageUrl(),
      user_name: data.email,
      user_email: data.email,
      message: data.comment,
      proyect: 'FOROMania',
      messageLog: `Recibimos tu consulta. A la brevedad posible nos pondremos en contacto con vos!.-`,
    };
    emailjs
      .send(
        'service_iew5q2g',
        'template_fgl8bsq',
        templateParams,
        'saMzvd5sdlHj2BhYr'
      )
      .then(
        () => {
          alert('Consulta enviada correctamente');
        },
        (error) => {
          console.error('Error al enviar el correo:', error.text);
        }
      );
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
          <form
            onSubmit={handleSubmit(onSubmitForm)}
            className='w-full form-contact'
          >
            <div className='flex flex-col items-center justify-start mt-7 w-full'>
              <FloatLabel>
                <InputText
                  id='email'
                  type='email'
                  className='border p-2 w-full bg-[#1b1b1b] text-white placeholder-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#61dafb]'
                  {...register('email', {
                    required: 'El Email es obligatorio',
                  })}
                />
                <label htmlFor='email' className='text-white'>
                  Email
                </label>
              </FloatLabel>
              {errors.email && (
                <span className='text-start text-xs text-red-500 font-semibold w-full mt-2'>
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className='flex flex-col items-center justify-center w-full mt-10'>
              <FloatLabel className='relative w-full'>
                <InputTextarea
                  id='comment'
                  rows={7}
                  className='border p-2 w-full bg-[#1b1b1b] text-white placeholder-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#61dafb] min-h-20'
                  {...register('comment', {
                    required: 'El Comentario es obligatorio',
                  })}
                />
                <label htmlFor='comment' className='text-white'>
                  Consulta o comentario
                </label>
              </FloatLabel>
              {errors.comment && (
                <span className='text-start text-xs text-red-500 font-semibold w-full'>
                  {errors.comment.message}
                </span>
              )}
            </div>
            <div className='flex justify-evenly items-center mt-5'>
              <button
                type='submit'
                className='w-44 mb-2 bg-[#1b95d2] hover:bg-[#157ab8] hover:border-[#157ab8] text-white py-2 px-4 rounded-sm focus:outline-none focus:shadow-outline border border-[#1b95d2]'
              >
                Enviar
              </button>
              <button
                onClick={() => {
                  onHide();
                  reset();
                }}
                className='w-44 mb-2 text-center py-2 px-4 text-[#61dafb] bg-[#282828] hover:bg-[#383838] focus:outline-none rounded-sm border border-[#61dafb] focus:ring-4 focus:ring-[#61dafb]'
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
}
