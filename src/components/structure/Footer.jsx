import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

export function Footer() {
	return (
		<footer>
			<section className='flex flex-col flex-wrap items-center justify-center w-full bg-neutral-900 py-3'>
				<div className='flex my-5'>
					<a href='/home'>
						<h1 className='title-multicolor font-bold text-4xl ml-4 hover:opacity-70'>
							ForoMania
						</h1>
					</a>
				</div>
				<div className='flex flex-row items-center justify-around w-full my-5'>
					<Button className='p-2 border-2 border-white rounded-md bg-blue-800 text-white hover:bg-blue-600 font-semibold'>
						Contacto
					</Button>
					<Button className='p-2 border-2 border-white rounded-md bg-blue-800 text-white hover:bg-blue-600 font-semibold'>
						Sobre Nosotros
					</Button>
				</div>
				<div className='flex flex-row flex-wrap items-center justify-around my-2 w-full'>
					<Link
						to='https://www.facebook.com/?locale=es_LA'
						target='_blank'>
						<i className='pi pi-facebook text-3xl text-neutral-50 hover:text-neutral-500'></i>
					</Link>
					<Link to='https://twitter.com/?lang=es' target='_blank'>
						<i className='pi pi-twitter text-2xl text-neutral-50 hover:text-neutral-500'></i>
					</Link>
					<Link to='https://www.instagram.com/' target='_blank'>
						<i className='pi pi-instagram text-2xl text-neutral-50 hover:text-neutral-500'></i>
					</Link>
				</div>
				<p className='text-sm text-neutral-50'>
					@ 2024. ForoMania - Derechos reservados
				</p>
			</section>
		</footer>
	);
}
