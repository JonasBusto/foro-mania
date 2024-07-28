import { useState } from 'react';
import { NavMenu } from '../header/NavMenu';
import { Login } from '../header/Login';
import { Register } from '../header/Register';
import { useAuth } from '../../hooks/useAuth';
import { useLoad } from '../../hooks/useLoad';
import { Image } from 'primereact/image';
import { Link } from 'react-router-dom';

export function Header() {
  const [openRegister, setOpenRegister] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { loggedUser } = useAuth();
  const { isLoading } = useLoad();

  const handleSignUp = () => {
    setOpenRegister((prevState) => !prevState);
    setOpenSignIn(false);
    setOpenSearch(false);
    setOpenMenu(false);
  };

  const handleSignIn = () => {
    setOpenSignIn((prevState) => !prevState);
    setOpenRegister(false);
    setOpenSearch(false);
    setOpenMenu(false);
  };

  const handleSearch = () => {
    setOpenSearch((prevState) => !prevState);
    setOpenRegister(false);
    setOpenSignIn(false);
    setOpenMenu(false);
  };

  const handleMenu = () => {
    setOpenMenu((prevState) => !prevState);
    setOpenRegister(false);
    setOpenSignIn(false);
    setOpenSearch(false);
  };

  const handleSearchSubmit = () => {
    console.log('Buscando:', searchQuery);
  };

  return (
    <header className='relative bg-black text-white'>
      <section className='flex items-center justify-between p-4'>
        <div className='flex items-center'>
          <a
            href='/'
            className='text-white text-3xl font-bold hover:opacity-80'
          >
            ForoMania
          </a>
        </div>

        <div className='flex items-center space-x-4'>
          {!loggedUser && !isLoading && (
            <>
              <button
                onClick={handleSignUp}
                className='text-white bg-green-600 hover:bg-green-500 px-4 py-2 rounded'
              >
                Registrarse
              </button>
              <Register
                visible={openRegister}
                setOpenRegister={setOpenRegister}
                onHide={() => setOpenRegister(false)}
              />

              <button
                onClick={handleSignIn}
                className='text-white bg-green-600 hover:bg-green-500 px-4 py-2 rounded'
              >
                Iniciar Sesión
              </button>
              <Login
                visible={openSignIn}
                setOpenSignIn={setOpenSignIn}
                onHide={() => setOpenSignIn(false)}
              />
            </>
          )}

          {loggedUser && (
            <Link
              to='/account'
              className='relative w-10 h-10 rounded-full ring-2 ring-[#1db954] overflow-hidden'
            >
              <Image
                className='object-cover w-full h-full'
                src={loggedUser.photoProfile}
                alt='Foto de perfil'
              />
            </Link>
          )}
          <div className='relative hidden sm:flex'>
            <button
              onClick={handleSearch}
              className='text-white hover:bg-gray-700 p-2 rounded'
            >
              <i className='pi pi-search text-xl'></i>
            </button>
            {openSearch && (
              <div className='absolute bg-gray-800 right-0 top-full mt-2 p-3 border border-gray-700 rounded-md shadow-lg w-[400px] flex'>
                <input
                  type='text'
                  placeholder='Buscar...'
                  className='w-full px-2 py-1 bg-gray-700 text-white rounded-md'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  onClick={handleSearchSubmit}
                  className='ml-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md'
                >
                  <i className='pi pi-search'></i>
                </button>
              </div>
            )}
          </div>

          <div className='relative'>
            <button
              onClick={handleMenu}
              className='text-white hover:bg-gray-700 p-2 rounded'
            >
              <i className='pi pi-bars text-2xl'></i>
            </button>
            {openMenu && (
              <div className='absolute z-10 right-0 top-full mt-3 border-2 border-green-600 rounded-md shadow-lg w-44 bg-gray-800'>
                <NavMenu />
              </div>
            )}
          </div>
        </div>
      </section>
    </header>
  );
}
