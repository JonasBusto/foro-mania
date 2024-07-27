import { Menu } from 'primereact/menu';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export function NavMenu() {
	const items = [
		{ label: 'Ultimos', icon: 'pi pi-fw pi-clock' },
		{ label: 'Top', icon: 'pi pi-fw pi-star' },
		{ label: 'Usuarios', icon: 'pi pi-fw pi-users' },
		{ label: 'Grupos', icon: 'pi pi-fw pi-th-large' },
		{ label: 'Categorias', icon: 'pi pi-fw pi-list' },
	];

	const itemTemplate = (item) => {
		return (
			<div className='flex items-center p-2  cursor-pointer text-white'>
				<i className={`${item.icon} text-white mr-2`}></i>
				<p>{item.label}</p>
			</div>
		);
	};

	return (
		<div className='card flex justify-center items-center '>
			<Menu
				model={items}
				className='w-full md:w-14rem custom-nav-menu bg-neutral-50 text-white'
				itemTemplate={itemTemplate}
			/>
		</div>
	);
}
