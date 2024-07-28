import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Formik } from 'formik';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import '../../styles/home.css';

export function Login({ visible, onHide, setOpenSignIn }) {
  const { loginGoogle, loginEmail, statusSign } = useAuth();

  return (
    <div>
      <Dialog
        className='custom-dialog'
        visible={visible}
        onHide={onHide}
        contentStyle={{
          width: '100%',
          backgroundColor: '#191414',
          borderRadius: '0 0 20px 20px',
          padding: 20,
          overflowX: 'hidden',
          overflowY: 'auto',
        }}
        style={{
          maxHeight: '80vh',
        }}
      >
        <div className='flex flex-col items-center mb-4'>
          <h1 className='text-white font-bold text-4xl mb-2'>Foromania</h1>
          <h2 className='text-gray-400 text-2xl'>Iniciar Sesión</h2>
        </div>
        <div className='w-full max-w-xs mx-auto'>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validate={(values) => {
              let errors = {};

              if (values.email.trim() === '') {
                errors.email = 'Requerido';
              } else if (
                !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                  values.email
                )
              ) {
                errors.email = 'Dirección de Email invalida';
              }

              if (values.password.trim() === '') {
                errors.password = 'Requerido';
              } else if (/\s/.test(values.password)) {
                errors.password = 'La contraseña no puede tener espacios.';
              } else if (
                values.password.split('').length < 6 ||
                values.password.split('').length > 14
              ) {
                errors.password =
                  'La contraseña debe tener entre 6 y 14 caracteres.';
              }

              return errors;
            }}
            onSubmit={(values) => {
              const { email, password } = values;
              loginEmail({ email, password }, { setOpenSignIn });
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
              <form onSubmit={handleSubmit} className='px-3 w-80 pb-8 mb-4'>
                <div className='mb-7'>
                  <FloatLabel>
                    <label htmlFor='email' className='text-white'>
                      Email
                    </label>
                    <InputText
                      className='border p-2 w-full bg-gray-800 text-white'
                      type='text'
                      id='email'
                      name='email'
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FloatLabel>
                  <div className='h-4'>
                    {touched.email && errors.email && (
                      <p className='text-xs text-red-500 font-semibold'>
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className='mb-7'>
                  <FloatLabel>
                    <label htmlFor='password' className='text-white'>
                      Contraseña
                    </label>
                    <InputText
                      className='border p-2 w-full bg-gray-800 text-white'
                      type='password'
                      name='password'
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FloatLabel>
                  <div className='h-4'>
                    {touched.password && errors.password && (
                      <p className='text-xs text-red-500 font-semibold'>
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>
                <div className='flex flex-col items-center justify-between'>
                  <button
                    className='w-full mb-2 bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    type='submit'
                    disabled={statusSign === 'Cargando'}
                  >
                    {statusSign === 'Cargando' ? 'Cargando' : 'Iniciar Sesión'}
                  </button>
                  <p className='mb-2 text-white'>o</p>
                  <button
                    className='w-full px-4 py-2 border flex gap-2 border-gray-700 rounded-lg text-white hover:border-gray-500 hover:text-gray-300 hover:shadow transition duration-150'
                    onClick={() => loginGoogle({ setOpenSignIn })}
                    type='button'
                    disabled={statusSign === 'Cargando'}
                  >
                    <img
                      className='w-6 h-6'
                      src='https://www.svgrepo.com/show/475656/google-color.svg'
                      alt='google logo'
                    />
                    Iniciar Sesión con Google
                  </button>
                </div>
                <div className='flex justify-center mt-4'>
                  <p className='text-sm font-semibold text-white'>
                    O registrate{' '}
                    <Link
                      className='text-green-500 hover:underline'
                      to='/register'
                    >
                      aquí
                    </Link>
                  </p>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </Dialog>
    </div>
  );
}
