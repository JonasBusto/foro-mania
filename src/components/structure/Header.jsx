import { useEffect, useRef, useState } from 'react';
import { NavMenu } from '../header/NavMenu';
import { Login } from '../header/Login';
import { Register } from '../header/Register';
import { useAuth } from '../../hooks/useAuth';
import { useLoad } from '../../hooks/useLoad';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useChatAction } from '../../hooks/useChatAction';
import { useDispatch, useSelector } from 'react-redux';
import { switchLogin, switchRegister } from '../../store/modals/slice';

export function Header() {
	const [openSearch, setOpenSearch] = useState(false);
	const [openMenu, setOpenMenu] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

	const { loggedUser } = useAuth();
	const { isLoading } = useLoad();
	const menuRef = useRef();
	const searchRef = useRef();

	const navigate = useNavigate();
	const location = useLocation();

	const { getTotalUnreadMessages } = useChatAction(); 

	useEffect(() => {
		if (loggedUser) {
			const fetchUnreadMessagesCount = async () => {
        const userId =loggedUser.uid
				const totalUnread = await getTotalUnreadMessages(userId);
				setUnreadMessagesCount(totalUnread);
			};
			fetchUnreadMessagesCount();
		}
	}, [getTotalUnreadMessages, loggedUser]);

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

	const registerModal = useSelector((state) => state.modal.registerModal);
	const loginModal = useSelector((state) => state.modal.loginModal);
	const dispatch = useDispatch();

	const handleSignUp = () => {
		dispatch(switchRegister());
	};

	const handleSignIn = () => {
		dispatch(switchLogin());
	};

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

	return (
		<header className='relative bg-black text-white'>
			<section
				className='flex items-center justify-center sm:justify-between flex-wrap flex-row pb-5 sm:pb-0 px-4 mx-auto'
				style={{ maxWidth: '1300px' }}>
				<div className='flex items-center justify-center'>
					<Link
						to='/'
						className='text-white text-3xl font-bold hover:opacity-80 m-5'>
						<img
							src='/img/header-logo.png'
							alt=''
							width={250}
							className=''
						/>
					</Link>
				</div>

				<div className='flex items-center space-x-4'>
					{!loggedUser && !isLoading && (
						<>
							<button
								onClick={handleSignUp}
								className='text-white bg-[#1b95d2] hover:bg-[#157ab8] px-4 py-2 rounded'>
								Registrarse
							</button>
							<Register
								visible={registerModal}
								setOpenRegister={() => dispatch(switchRegister())}
								onHide={() => dispatch(switchRegister())}
							/>

							<button
								onClick={handleSignIn}
								className='text-white bg-[#1b95d2] hover:bg-[#157ab8] px-4 py-2 rounded'>
								Iniciar Sesión
							</button>
							<Login
								visible={loginModal}
								setOpenSignIn={() => dispatch(switchLogin())}
								onHide={() => dispatch(switchLogin())}
							/>
						</>
					)}

					{loggedUser && (
						<Link
							to='/account'
							className='relative w-10 h-10 rounded-full ring-2 ring-[#61dafb] overflow-hidden'>
							<img
								className='object-cover w-full h-full'
								src={loggedUser.photoProfile}
								alt='Foto de perfil'
							/>
						</Link>
					)}
					{loggedUser && (
						<Link
							to='/chats'
							className='relative text-white hover:bg-gray-700 p-2 rounded'>
							<i className='pi pi-envelope text-2xl'></i>
							{unreadMessagesCount > 0 && (
								<span className='absolute top-0 right-0 bg-[#61dafb] text-black text-xs rounded-full px-2 py-1'>
									{unreadMessagesCount}
								</span>
							)}
						</Link>
					)}
					<div ref={searchRef} className='relative hidden sm:flex'>
						<button
							onClick={handleSearch}
							className='text-white hover:bg-gray-700 p-2 rounded'>
							<i className='pi pi-search text-xl'></i>
						</button>
						{openSearch && (
							<div className='absolute bg-gray-800 right-0 top-full mt-2 p-3 border border-gray-700 rounded-md shadow-lg w-[400px] flex'>
								<input
									type='text'
									placeholder='Buscar...'
									className='w-full px-2 py-1 bg-[#1b1b1b] text-white placeholder-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#61dafb]'
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
								<button
									onClick={handleSearchSubmit}
									className='ml-2 bg-[#157ab8] hover:bg-[#106ba1] text-white px-4 py-2 rounded-md focus:outline-none'>
									<i className='pi pi-search'></i>
								</button>
							</div>
						)}
					</div>

					<div className='relative'>
						<button
							onClick={handleMenu}
							className='text-white hover:bg-gray-700 p-2 rounded'>
							<i className='pi pi-bars text-2xl'></i>
						</button>
						{openMenu && (
							<div
								ref={menuRef}
								className='absolute z-10 right-0 top-full mt-3 border-2 border-[#61dafb] rounded-md shadow-lg w-44 bg-gray-800'>
								<NavMenu />
							</div>
						)}
					</div>
				</div>
			</section>
		</header>
	);
}
