import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Formik } from 'formik';

export function Register() {
  const { loginGoogle, register, statusSign } = useAuth();

  return (
    <div>
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
            register(values);
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
              className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
            >
              <p className='font-bold text-center uppercase'>Registrarse</p>
              <div className='mb-4'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='fullName'
                >
                  Nombre completo
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  type='text'
                  name='fullName'
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.fullName && errors.fullName && (
                  <p className='text-xs text-red-500 font-semibold'>
                    {errors.fullName}
                  </p>
                )}
              </div>
              <div className='mb-4'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='email'
                >
                  Email
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
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
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='password'
                >
                  Contraseña
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  type='password'
                  name='password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.password && errors.password && (
                  <p className='text-xs text-red-500 font-semibold'>
                    {errors.password}
                  </p>
                )}
              </div>
              <div className='mb-4'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='checkPassword'
                >
                  Confirmar contraseña
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  type='password'
                  name='checkPassword'
                  value={values.checkPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.checkPassword && errors.checkPassword && (
                  <p className='text-xs text-red-500 font-semibold'>
                    {errors.checkPassword}
                  </p>
                )}
              </div>
              <div className='flex flex-col items-center justify-between'>
                <button
                  className='w-full mb-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  type='submit'
                  disabled={statusSign === 'Cargando'}
                >
                  {statusSign === 'Cargando' ? 'Cargando' : 'Registrarse'}
                </button>
                <p className='mb-2'>o</p>
                <button
                  className='w-full px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150'
                  onClick={loginGoogle}
                  type='button'
                  disabled={statusSign === 'Cargando'}
                >
                  <img
                    className='w-6 h-6'
                    src='https://www.svgrepo.com/show/475656/google-color.svg'
                    loading='lazy'
                    alt='google logo'
                  ></img>
                  Inicia sesión con Google
                </button>
              </div>
              <div className='flex justify-center mt-4'>
                <p className='text-sm font-semibold'>
                  O inicia sesión{' '}
                  <Link className='text-blue-500 hover:underline' to='/login'>
                    aquí
                  </Link>
                </p>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
