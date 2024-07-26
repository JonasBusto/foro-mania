import { useState } from 'react';
import { NavMenu } from '../header/NavMenu';
import { Login } from '../header/Login';
import { Register } from '../header/Register';

export function Header() {
	const [openRegister, setOpenRegister] = useState(false);
	const [openSignIn, setOpenSignIn] = useState(false);
	const [openSearch, setOpenSearch] = useState(false);
	const [openMenu, setOpenMenu] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');

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
		// Lógica para manejar la búsqueda
		console.log('Buscando:', searchQuery);
	};

	return (
		<header className='relative bg-slate-100 rounded-b-2xl'>
			<section className='flex flex-row flex-wrap items-center justify-between'>
				<div className='flex items-center justify-start'>
					<a href='/home'>
						<h1 className='title-multicolor font-bold text-4xl ml-4'>
							ForoMania
						</h1>
					</a>
				</div>
				<div className='flex flex-row flex-wrap items-center justify-center md:justify-end mr-3 font-semibold'>
					<button
						onClick={handleSignUp}
						className='p-2 m-2 bg-blue-800 text-blue-50 rounded-xl text-center hover:bg-blue-600 flex items-center'>
						<i className='pi pi-user-plus text-xl mx-2 '></i>
						Registrarse
					</button>
					<Register
						visible={openRegister}
						onHide={() => setOpenRegister(false)}
					/>
					<button
						onClick={handleSignIn}
						className='p-2 m-2 bg-blue-800 text-blue-50 rounded-xl hover:bg-blue-600 flex items-center'>
						<i className='pi pi-sign-in text-xl mx-2'></i>
						Iniciar Sesion
					</button>
					<Login
						visible={openSignIn}
						onHide={() => setOpenSignIn(false)}
					/>
<div className='flex flex-row items-center'>
					<div className='relative'>
						<button onClick={handleSearch} className='relative'>
							<i className='pi pi-search text-2xl p-2 mx-2 hover:bg-blue-800 rounded-xl hover:text-white'></i>
						</button>
						{openSearch && (
							<div className='absolute right-0 top-full mt-2 p-4 bg-white border border-gray-500 rounded-lg shadow-lg w-64 flex'>
								<input
									type='text'
									placeholder='Buscar...'
									className='w-full px-2 border-transparent focus:border-transparent rounded-xl'
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
								<button
									onClick={handleSearchSubmit}
									className='m-2 p-2 bg-blue-800 text-blue-50 rounded-xl text-center hover:bg-blue-600 '>
									<i className='pi pi-search'></i>
								</button>
							</div>
						)}
					</div>

					<div className='relative'>
						<button onClick={handleMenu} className='relative'>
							<i className='pi pi-bars text-2xl p-2 mx-2 hover:bg-blue-800 rounded-xl hover:text-white'></i>
						</button>
						{openMenu && (
							<div className='absolute right-0 top-full mt-2 p-4 bg-white border border-gray-500 rounded-lg shadow-lg w-44 flex'>
								<NavMenu />
							</div>
						)}
					</div></div>
				</div>
			</section>
		</header>
	);
}
