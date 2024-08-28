import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormContact } from '../home/FormContact';
import { format } from 'date-fns';

export function Footer() {
  const [formContact, setFormContact] = useState(false);

  const handleFormContact = () => {
    setFormContact(true);
  };

  const currentYear = format(new Date(), 'yyyy');

  return (
    <footer className='mt-auto w-full bg-[#1f1f1f] text-neutral-300'>
      <section className='flex flex-col items-center py-5 gap-2'>
        <div className='flex items-center'>
          <Link
            to='/'
            className='text-white text-3xl font-bold hover:opacity-80 duration-200'
          >
            <img src='/img/logo-foromania-footer.png' alt='' width={120} />
          </Link>
        </div>
        <div className='flex flex-col lg:flex-row items-center justify-between w-full lg:px-8'>
          <div className='flex items-center  gap-2 lg:w-1/3'>
            <Link to='https://www.facebook.com/?locale=es_LA' target='_blank'>
              <i className='pi pi-facebook text-lg hover:text-neutral-50 duration-100'></i>
            </Link>
            <Link to='https://twitter.com/?lang=es' target='_blank'>
              <i className='pi pi-twitter text-lg hover:text-neutral-50 duration-100'></i>
            </Link>
            <Link to='https://www.instagram.com/' target='_blank'>
              <i className='pi pi-instagram text-lg hover:text-neutral-50 duration-100'></i>
            </Link>
          </div>
          <p className='text-sm text-center  lg:w-1/3'>
            © {currentYear}. ForoMania - Todos los derechos reservados.
          </p>
          <div className='flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-end gap-2 text-sm lg:w-1/3'>
            <Link
              to='/users-view'
              className='hover:text-neutral-50 duration-100'
            >
              Usuarios
            </Link>
            <p>•</p>
            <Link
              to='/all-categories'
              className='hover:text-neutral-50 duration-100'
            >
              Categorias
            </Link>
            <p>•</p>
            <Link
              onClick={handleFormContact}
              className='hover:text-neutral-50 duration-100'
            >
              Contacto
            </Link>
            <p>•</p>
            <Link to='/about' className='hover:text-neutral-50 duration-100'>
              Sobre Nosotros
            </Link>
          </div>
        </div>
      </section>
      {formContact && (
        <FormContact
          visible={formContact}
          onHide={() => setFormContact(false)}
        />
      )}
    </footer>
  );
}
