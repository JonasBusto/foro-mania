import { Menu } from 'primereact/menu';
import { useNavigate } from 'react-router-dom';

export function NavMenu() {
  const navigate = useNavigate();

  const items = [
    {
      label: 'Ultimos',
      icon: 'pi pi-fw pi-clock',
      command: () => {
        navigate('/topic-list?orderBy=last');
      },
    },
    {
      label: 'Top',
      icon: 'pi pi-fw pi-star',
      command: () => {
        navigate('/topic-list?orderBy=top');
      },
    },
    {
      label: 'Usuarios',
      icon: 'pi pi-fw pi-users',
      command: () => {
        navigate('/users-view');
      },
    },
    {
      label: 'Categorias',
      icon: 'pi pi-fw pi-list',
      command: () => {
        navigate('/all-categories');
      },
    },
  ];

  return (
    <div className='flex justify-center items-center '>
      <Menu model={items} className='w-full md:w-14rem custom-nav-menu ' />
    </div>
  );
}
