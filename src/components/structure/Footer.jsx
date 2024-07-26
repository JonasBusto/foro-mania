import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

export function Footer() {
	return (
		<footer>
			<div className='flex flex-col flex-wrap items-center justify-center w-full bg-slate-100 rounded-t-2xl my-3'>
				<div className='flex flex-row items-center justify-around w-full my-5'>
					<Button className='p-2 border-2 border-white rounded-xl bg-blue-800 text-white hover:bg-blue-600 font-semibold'>
						Contacto
					</Button>
					<Button className='p-2 border-2 border-white rounded-xl bg-blue-800 text-white hover:bg-blue-600 font-semibold'>
						Sobre Nosotros
					</Button>
				</div>
				<div className='flex flex-row flex-wrap items-center justify-around my-2 w-full'>
					<Link to=''>
						<i className='pi pi-facebook text-3xl text-slate-500 hover:text-slate-800'></i>
					</Link>
					<Link to=''>
						<i className='pi pi-twitter text-2xl text-slate-500 hover:text-slate-800'></i>
					</Link>
					<Link to=''>
						<i className='pi pi-instagram text-2xl text-slate-500 hover:text-slate-800'></i>
					</Link>
				</div>
				<p className='text-sm'>@ 2024. ForoMania - Derechos reservados</p>
			</div>
		</footer>
	);
}
