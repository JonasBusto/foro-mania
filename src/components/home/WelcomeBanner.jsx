import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { switchRegister } from '../../store/modals/slice';
import { useAuth } from '../../hooks/useAuth';

export const WelcomeBanner = ({ setShowWelcome }) => {
  const { loggedUser } = useAuth();
  const dispatch = useDispatch();

  return (
    <div
      data-testid='welcome-banner'
      className='border-2 border-neutral-300 py-3 px-6 rounded-sm relative bg-neutral-800'
    >
      <button
        className='absolute top-0 right-2 text-xl'
        onClick={() => setShowWelcome(false)}
      >
        ×
      </button>
      <h2 className='font-semibold text-xl mb-2'>¡Bienvenido a ForoMania!</h2>
      <div className='italic'>
        <p role='presentation' className='mb-1'>
          ¡Hola! Nos alegra verte en ForoMania, un espacio donde puedes
          compartir tus ideas, aprender de los demás y crecer junto a la
          comunidad. Queremos recordarte la importancia de ser respetuoso con
          todos los miembros. Tu cortesía y respeto ayudan a mantener un
          ambiente agradable para todos.
        </p>
        {loggedUser === null && (
          <p className='mb-1'>
            Si aún no te has registrado, te invitamos a{' '}
            <button
              className='text-neutral-400 underline'
              onClick={() => dispatch(switchRegister())}
            >
              registrarte aqui
            </button>{' '}
            para disfrutar de todas las funcionalidades de nuestro foro. ¡Únete
            a nuestras conversaciones y sé parte de ForoMania!
          </p>
        )}

        <p>
          Puedes revisar nuestra{' '}
          <Link
            className='text-neutral-400 underline'
            to='https://docs.google.com/document/d/1hnTSg_Hp0BAaFZe77bRljGfqblmNo_T0jJMpsGtupAY/pub'
            target='_blank'
          >
            política de privacidad
          </Link>{' '}
          para entender cómo protegemos tu información.
        </p>
      </div>
    </div>
  );
};
