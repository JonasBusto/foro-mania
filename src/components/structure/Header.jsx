import { useState } from 'react';
import { NavMenu } from '../header/NavMenu';
import { Login } from '../header/Login';
import { Register } from '../header/Register';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useAuth } from '../../hooks/useAuth';

export function Header() {
	const { loggedUser, logout } = useAuth();

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
		<header className='relative bg-neutral-900 '>
			<section className='flex flex-row flex-wrap items-center justify-between'>
				<div className='flex items-center justify-center md:justify-start w-full md:w-fit'>
					<a href='/home'>
						<h1 className='title-multicolor font-bold text-4xl ml-4 hover:opacity-70'>
							ForoMania
						</h1>
					</a>
				</div>
				<div className='flex flex-row flex-wrap items-center justify-center md:justify-end mr-3 font-semibold w-full md:w-fit'>
					{loggedUser ? null : (
						<>
							<Button
								onClick={handleSignUp}
								className='p-2 m-2 bg-blue-800 text-blue-50 rounded-md text-center border-2 border-blue-50 hover:bg-blue-600 flex items-center'>
								<i className='pi pi-user-plus text-xl mx-2 '></i>
								Registrarse
							</Button>
							<Register
								visible={openRegister}
								onHide={() => setOpenRegister(false)}
							/>
						</>
					)}
					{loggedUser ? (
						<Button
							onClick={logout}
							className='p-2 m-2 bg-red-800 text-blue-50 rounded-md border-2 border-blue-50 hover:bg-blue-600 flex items-center'>
							<i className='pi pi-sign-in text-xl mx-2'></i>
							Cerrar Sesion
						</Button>
					) : (
						<>
							<Button
								onClick={handleSignIn}
								className='p-2 m-2 bg-blue-800 text-blue-50 rounded-md border-2 border-blue-50 hover:bg-blue-600 flex items-center'>
								<i className='pi pi-sign-in text-xl mx-2'></i>
								Iniciar Sesion
							</Button>
							<Login
								visible={openSignIn}
								onHide={() => setOpenSignIn(false)}
							/>
						</>
					)}
					<div className='flex flex-row items-center '>
						<div className='relative hidden sm:flex'>
							<Button onClick={handleSearch} className='relative bg-transparent'>
								<i className='pi pi-search text-2xl p-2 mx-2 hover:bg-blue-800 rounded-md hover:border-2 hover:border-blue-50 text-white'></i>
							</Button>
							{openSearch && (
								<div className='absolute bg-neutral-800 right-0 top-full mt-2 p-3 border border-white rounded-md shadow-lg w-[400px] flex'>
									<InputText
										type='text'
										placeholder='Buscar...'
										className='w-full px-2  rounded-md '
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
									/>
									<Button
										onClick={handleSearchSubmit}
										className='m-2 p-4 flex items-center justify-center bg-blue-800 text-blue-50 rounded-md text-center hover:bg-blue-600 '>
										<i className='pi pi-search'></i>
									</Button>
								</div>
							)}
						</div>

						<div className='relative'>
							<Button onClick={handleMenu} className='relative bg-transparent'>
								<i className='pi pi-bars text-2xl p-2 mx-2 hover:bg-blue-800 rounded-md text-white hover:border-2 hover:border-blue-50'></i>
							</Button>
							{openMenu && (
								<div className='absolute  z-10 right-0 top-full mt-3 border-4 border-blue-500 rounded-md shadow-lg w-44 flex items-center justify-start '>
									<NavMenu />
								</div>
							)}
						</div>
					</div>
				</div>
			</section>
		</header>
	);
}
