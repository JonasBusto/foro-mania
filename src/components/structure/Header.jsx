import { useEffect, useRef, useState } from 'react';
import { NavMenu } from '../header/NavMenu';
import { Login } from '../header/Login';
import { Register } from '../header/Register';
import { useAuth } from '../../hooks/useAuth';
import { useLoad } from '../../hooks/useLoad';
import { Link, useNavigate } from 'react-router-dom';
import { useChatAction } from '../../hooks/useChatAction';
import { useModal } from '../../hooks/useModal';

export function Header() {
  const [openSearch, setOpenSearch] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { loggedUser } = useAuth();
  const {
    switchModalLogin,
    switchModalRegister,
    showLoginModal,
    showRegisterModal,
  } = useModal();
  const { isLoading } = useLoad();
  const { clearCountMessagesByUser, unreadMessagesCount } = useChatAction();
  const menuRef = useRef();
  const searchRef = useRef();
  const navigate = useNavigate();

  const { listenForNewMessages } = useChatAction();

  useEffect(() => {
    if (loggedUser) {
      listenForNewMessages(loggedUser?.uid, unreadMessagesCount);
    } else {
      clearCountMessagesByUser();
    }
  }, [unreadMessagesCount, loggedUser]);

  const handleSearch = () => {
    setOpenSearch((prevState) => !prevState);
    setOpenMenu(false);
  };

  const handleMenu = () => {
    setOpenMenu((prevState) => !prevState);
    setOpenSearch(false);
  };

  const handleSearchSubmit = () => {
    navigate(`/topic-list?search=${searchQuery}`);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenMenu(false);
    }
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setOpenSearch(false);
    }
  };

  useEffect(() => {
    setOpenMenu(false);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [location]);

  return (
    <header className='relative bg-black text-white'>
      <section className='flex items-center justify-between flex-wrap flex-row py-2 px-3 xs:px-4 md:py-0 mx-auto'>
        <div className='flex items-center justify-center'>
          <Link
            to='/'
            className='text-white w-[110px] xs:w-[130px] text-3xl font-bold hover:opacity-80 duration-200 m-2 md:m-5 md:w-[250px]'
          >
            <img
              src='/img/header-logo.png'
              alt='Logo de Foromanía'
              className='hidden md:flex'
              draggable={false}
            />
            <img
              src='/img/logo-foromania-footer.png'
              alt='Logo de Foromanía'
              className='md:hidden'
              draggable={false}
            />
          </Link>
        </div>

        <div className='flex items-center md:space-x-3'>
          {!loggedUser && !isLoading && (
            <>
              <button
                onClick={switchModalRegister}
                className='hidden md:inline text-white rounded-sm text-sm bg-[#1b95d2] hover:bg-[#157ab8] duration-200 px-2 py-2 md:px-4 md:text-base'
              >
                Registrarse
              </button>
              <Register
                visible={showRegisterModal}
                setOpenRegister={switchModalRegister}
                onHide={switchModalRegister}
              />

              <button
                onClick={switchModalLogin}
                className='text-white rounded-sm text-sm bg-[#1b95d2] hover:bg-[#157ab8] duration-200 px-2 py-2 md:px-4 mr-3 xs:mr-4 md:mr-0 md:text-base'
              >
                Iniciar Sesión
              </button>
              <Login
                visible={showLoginModal}
                setOpenSignIn={switchModalLogin}
                onHide={switchModalLogin}
              />
            </>
          )}

          {loggedUser && (
            <Link
              to='/account'
              className='relative mx-2 md:mx-0 w-8 h-8 md:w-9 md:h-9 rounded-full ring-2 ring-[#61dafb] overflow-hidden'
            >
              <img
                className='object-cover w-full h-full'
                src={loggedUser.photoProfile}
                alt='Foto de perfil'
                draggable={false}
              />
            </Link>
          )}

          <Link to='/' className='hidden md:block'>
            <i className='pi pi-home text-2xl text-white hover:bg-gray-700 duration-200 p-2 rounded ml-2'></i>
          </Link>

          {loggedUser && (
            <Link to='/chats' className='relative mx-1 md:mx-0'>
              <i className='pi pi-envelope text-xl text-white hover:bg-gray-700 duration-200 p-2 rounded'></i>
              {unreadMessagesCount > 0 && (
                <span className='absolute top-0 right-0 bg-[#61dafb] text-black text-xs rounded-full flex items-center justify-center w-5 h-5'>
                  {unreadMessagesCount}
                </span>
              )}
            </Link>
          )}

          <div ref={searchRef} className='relative hidden md:flex'>
            <button onClick={handleSearch}>
              <i className='pi pi-search text-xl text-white hover:bg-gray-700 duration-200 p-2 rounded'></i>
            </button>

            {openSearch && (
              <div className='absolute bg-[#000000] right-0 top-full mt-2 p-3  shadow-lg w-[80vw] xl:w-[800px] flex'>
                <input
                  type='text'
                  placeholder='Buscar...'
                  className='w-full px-2 py-1 bg-[#1b1b1b] text-white placeholder-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#61dafb]'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  onClick={() => {
                    handleSearchSubmit();
                    handleSearch();
                  }}
                  className='ml-2 bg-[#157ab8] hover:bg-[#106ba1] duration-200 text-white px-4 py-2 rounded-sm focus:outline-none'
                >
                  <i className='pi pi-search'></i>
                </button>
              </div>
            )}
          </div>

          <div className='relative'>
            <button onClick={handleMenu}>
              <i className='pi pi-bars text-2xl text-white hover:bg-gray-700 duration-200 p-2 rounded md:mr-2'></i>
            </button>
            {openMenu && (
              <div
                ref={menuRef}
                className='absolute z-10 right-0 border-2 border-[#157ab8] top-full mt-3 rounded-sm shadow-lg'
              >
                <NavMenu loggedUser={loggedUser} handleMenu={handleMenu} />
              </div>
            )}
          </div>
        </div>
      </section>
    </header>
  );
}
