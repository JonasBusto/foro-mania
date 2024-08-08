import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Formik } from 'formik';
import { useUserAction } from '../../hooks/useUserAction';
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/store';
import Loader from '../../utils/Loader';

export function FormUser() {
  const { id } = useParams();
  const { statusSign } = useAuth();
  const { user, getUser, clearStateUser } = useUserAction();
  const statusUser = useAppSelector((state) => state.user.statusUser);

  let initialValues = {
    fullName: '',
    photoProfile:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
    email: '',
    password: '',
    role: 'user',
  };

  useEffect(() => {
    if (id) {
      getUser({ id });
    } else {
      clearStateUser();
    }
  }, []);

  if (id && user) {
    initialValues = {
      fullName: user.fullName,
      photoProfile: user.photoProfile,
      email: user.email,
      password: 'falta123',
      role: user.role,
    };
  }

  if (statusUser === 'Cargando') {
    return <Loader />;
  }

  return (
    <div>
      <div className='w-full max-w-screen-md mx-auto'>
        <Formik
          initialValues={initialValues}
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

            if (!id && !user) {
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
            }

            if (values.role.trim() === '') {
              errors.role = 'Requerido';
            }

            return errors;
          }}
          onSubmit={(values) => {
            if (id && user) {
              console.log('mod: ', values);
            } else {
              console.log('alta: ', values);
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
          }) => (
            <form
              onSubmit={handleSubmit}
              className='bg-white rounded px-8 pt-6 pb-8 mb-4'
            >
              <p className='font-bold text-center uppercase mb-7'>
                Cargar usuario
              </p>
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
                  htmlFor='photoProfile'
                >
                  Foto de Perfil
                </label>
                <img
                  className='aspect-square rounded-md shadow-md mx-auto my-4 w-60 h-60'
                  src={values.photoProfile}
                  alt=''
                />
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  type='text'
                  name='photoProfile'
                  value={values.photoProfile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.photoProfile && errors.photoProfile && (
                  <p className='text-xs text-red-500 font-semibold'>
                    {errors.photoProfile}
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
              {(!id || !user) && (
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
              )}
              <div className='mb-4'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='role'
                >
                  Estado
                </label>
                <select
                  className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  name='role'
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value='user'>Usuario</option>
                  <option value='admin'>Administrador</option>
                </select>
                {touched.role && errors.role && (
                  <p className='text-xs text-red-500 font-semibold'>
                    {errors.role}
                  </p>
                )}
              </div>
              <div className='flex flex-col items-center justify-between'>
                <button
                  className='w-full mb-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  type='submit'
                  disabled={statusSign === 'Cargando'}
                >
                  {statusSign === 'Cargando' ? 'Cargando' : 'Cargar usuario'}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
