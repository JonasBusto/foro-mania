import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Formik } from 'formik';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import '../../styles/home.css';

export function Register({ visible, onHide, setOpenRegister }) {
  const { loginGoogle, register, statusSign } = useAuth();

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
          <h2 className='text-gray-400 text-2xl'>Registrarse</h2>
        </div>
        <div className='w-full max-w-xs mx-auto'>
          <Formik
            initialValues={{
              fullName: '',
              photoProfile:
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
              email: '',
              password: '',
              checkPassword: '',
              role: 'user',
            }}
            validate={(values) => {
              let errors = {};

              if (values.fullName.trim() === '') {
                errors.fullName = 'Requerido';
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

              if (values.checkPassword.trim() === '') {
                errors.checkPassword = 'Requerido';
              } else if (values.password !== values.checkPassword) {
                errors.checkPassword = 'Las contraseñas no coinciden.';
              } else if (/\s/.test(values.checkPassword)) {
                errors.checkPassword =
                  'La confirmación de la contraseña tampoco puede tener espacios.';
              } else if (
                values.checkPassword.split('').length < 6 ||
                values.checkPassword.split('').length > 14
              ) {
                errors.checkPassword =
                  'La confirmación de la contraseña debe tener entre 6 y 14 caracteres.';
              }

              return errors;
            }}
            onSubmit={(values) => {
              register(values, { setOpenRegister });
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
                    <label htmlFor='fullName' className='text-white'>
                      Nombre completo
                    </label>
                    <InputText
                      className='border p-2 w-full bg-gray-800 text-white'
                      type='text'
                      id='fullName'
                      name='fullName'
                      value={values.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FloatLabel>
                  <div className='h-4'>
                    {touched.fullName && errors.fullName && (
                      <p className='text-xs text-red-500 font-semibold'>
                        {errors.fullName}
                      </p>
                    )}
                  </div>
                </div>
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
                      id='password'
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
                <div className='mb-7'>
                  <FloatLabel>
                    <label htmlFor='checkPassword' className='text-white'>
                      Confirmar contraseña
                    </label>
                    <InputText
                      className='border p-2 w-full bg-gray-800 text-white'
                      type='password'
                      id='checkPassword'
                      name='checkPassword'
                      value={values.checkPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FloatLabel>
                  <div className='h-4'>
                    {touched.checkPassword && errors.checkPassword && (
                      <p className='text-xs text-red-500 font-semibold'>
                        {errors.checkPassword}
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
                    {statusSign === 'Cargando' ? 'Cargando' : 'Registrarse'}
                  </button>
                  <p className='mb-2 text-white'>o</p>
                  <button
                    className='w-full px-4 py-2 border flex gap-2 border-gray-700 rounded-lg text-white hover:border-gray-500 hover:text-gray-300 hover:shadow transition duration-150'
                    onClick={loginGoogle}
                    type='button'
                    disabled={statusSign === 'Cargando'}
                  >
                    <img
                      className='w-6 h-6'
                      src='https://www.svgrepo.com/show/475656/google-color.svg'
                      alt='google logo'
                    />
                    Inicia sesión con Google
                  </button>
                </div>
                <div className='flex justify-center mt-4'>
                  <p className='text-sm font-semibold text-white'>
                    O inicia sesión{' '}
                    <Link
                      className='text-green-500 hover:underline'
                      to='/login'
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
