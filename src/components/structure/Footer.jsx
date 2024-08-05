import { Button } from 'primereact/button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormContact } from '../home/FormContact';

export function Footer() {
  const [formContact, setFormContact] = useState(false);

  const handleFormContact = () => {
    setFormContact(true);
  };

  return (
    <footer className='mt-auto w-full bg-[#1f1f1f] text-neutral-50'>
      <section className='flex flex-col items-center justify-center w-full py-6'>
        <div className='flex items-center mb-6'>
          <Link to='/'>
            <h1 className='text-4xl font-bold text-[#61dafb] hover:text-[#0fadfc]'>
              ForoMania
            </h1>
          </Link>
        </div>
        <div className='flex flex-wrap items-center justify-center gap-4 mb-6'>
          <button
            onClick={handleFormContact}
            className='w-40 text-center py-2 px-5 text-sm font-medium text-[#61dafb] bg-[#282828] hover:bg-[#383838] focus:outline-none rounded-lg border border-[#61dafb] focus:ring-4 focus:ring-[#61dafb]'
          >
            Contacto
          </button>
          <Link
            to='/about'
            className='w-40 py-2 px-5 text-center text-sm font-medium text-[#61dafb] bg-[#282828] hover:bg-[#383838] focus:outline-none rounded-lg border border-[#61dafb] focus:ring-4 focus:ring-[#61dafb]'
          >
            Sobre Nosotros
          </Link>
        </div>
        <div className='flex flex-wrap items-center justify-center gap-6 mb-6'>
          <Link to='https://www.facebook.com/?locale=es_LA' target='_blank'>
            <i className='pi pi-facebook text-3xl text-[#61dafb] hover:text-[#0fadfc] transition-colors'></i>
          </Link>
          <Link to='https://twitter.com/?lang=es' target='_blank'>
            <i className='pi pi-twitter text-3xl text-[#61dafb] hover:text-[#0fadfc] transition-colors'></i>
          </Link>
          <Link to='https://www.instagram.com/' target='_blank'>
            <i className='pi pi-instagram text-3xl text-[#61dafb] hover:text-[#0fadfc] transition-colors'></i>
          </Link>
        </div>
        <p className='text-sm text-neutral-300'>
          @ 2024. ForoMania - Derechos reservados
        </p>
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
