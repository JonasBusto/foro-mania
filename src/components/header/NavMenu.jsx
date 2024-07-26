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
			<div className='flex items-center p- bg-blue-50 text-blue-950 hover:bg-blue-800 hover:text-blue-50 cursor-pointer'>
				<i className={`${item.icon} mr-2`}></i>
				<span>{item.label}</span>
			</div>
		);
	};

	return (
		<div className='card flex justify-center items-center'>
			<Menu
				model={items}
				className='w-full md:w-14rem'
				itemTemplate={itemTemplate}
			/>
		</div>
	);
}
