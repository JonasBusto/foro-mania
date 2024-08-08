import { Menu } from 'primereact/menu';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export function NavMenu() {
	const items = [
		{
			label: 'Ultimos',
			icon: 'pi pi-fw pi-clock',
			url: '#/topic-list?orderBy=last',
		},
		{
			label: 'Top',
			icon: 'pi pi-fw pi-star',
			url: '#/topic-list?orderBy=top',
		},
		{ label: 'Usuarios', icon: 'pi pi-fw pi-users', url: '#/users-view' },
		{
			label: 'Categorias',
			icon: 'pi pi-fw pi-list',
			url: '#/all-categories',
		},
	];

	const itemTemplate = (item) => {
		return (
			<div className='flex items-center p-2  cursor-pointer '>
				<i className={`${item.icon} mr-2`}></i>
				<p>{item.label}</p>
			</div>
		);
	};

	return (
		<div className='flex justify-center items-center '>
			<Menu model={items} className='w-full md:w-14rem custom-nav-menu ' />
		</div>
	);
}
