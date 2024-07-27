import { useState } from 'react';
import { NavMenu } from '../header/NavMenu';
import { Login } from '../header/Login';
import { Register } from '../header/Register';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

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
				<div className='flex items-center justify-center md:justify-start w-full md:w-fit'>
					<a href='/home'>
						<h1 className='title-multicolor font-bold text-4xl ml-4'>
							ForoMania
						</h1>
					</a>
				</div>
				<div className='flex flex-row flex-wrap items-center justify-center md:justify-end mr-3 font-semibold w-full md:w-fit'>
					<Button
						onClick={handleSignUp}
						className='p-2 m-2 bg-blue-800 text-blue-50 rounded-xl text-center hover:bg-blue-600 flex items-center'>
						<i className='pi pi-user-plus text-xl mx-2 '></i>
						Registrarse
					</Button>
					<Register
						visible={openRegister}
						onHide={() => setOpenRegister(false)}
					/>

					<Button
						onClick={handleSignIn}
						className='p-2 m-2 bg-blue-800 text-blue-50 rounded-xl hover:bg-blue-600 flex items-center'>
						<i className='pi pi-sign-in text-xl mx-2'></i>
						Iniciar Sesion
					</Button>
					<Login
						visible={openSignIn}
						onHide={() => setOpenSignIn(false)}
					/>
					<div className='flex flex-row items-center'>
						<div className='relative hidden sm:flex'>
							<Button onClick={handleSearch} className='relative'>
								<i className='pi pi-search text-2xl p-2 mx-2 hover:bg-blue-800 rounded-xl hover:text-white'></i>
							</Button>
							{openSearch && (
								<div className='absolute right-0 top-full mt-2 p-4 bg-white border border-gray-500 rounded-lg shadow-lg w-[400px] flex'>
									<InputText
										type='text'
										placeholder='Buscar...'
										className='w-full px-2 border-transparent focus:border-transparent rounded-xl'
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
									/>
									<Button
										onClick={handleSearchSubmit}
										className='m-2 p-4 flex items-center justify-center bg-blue-800 text-blue-50 rounded-xl text-center hover:bg-blue-600 '>
										<i className='pi pi-search'></i>
									</Button>
								</div>
							)}
						</div>

						<div className='relative'>
							<Button onClick={handleMenu} className='relative'>
								<i className='pi pi-bars text-2xl p-2 mx-2 hover:bg-blue-800 rounded-xl hover:text-white'></i>
							</Button>
							{openMenu && (
								<div className='absolute  z-10 right-0 top-full mt-3  bg-white border-4 border-blue-500 rounded-lg shadow-lg w-44 flex items-center justify-start '>
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
