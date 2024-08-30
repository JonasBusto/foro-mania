import { Menu } from 'primereact/menu';
import { useNavigate } from 'react-router-dom';

export function NavMenu({ loggedUser }) {
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

  const mobileItems = [
    {
      label: 'Inicio',
      icon: 'pi pi-fw pi-home',
      command: () => {
        navigate('/');
      },
    },
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

  const itemsAdmin = [
    {
      label: 'Gestionar Categorias',
      icon: 'pi pi-fw pi-list',
      command: () => {
        navigate('/categories');
      },
    },
    {
      label: 'Gestionar Tags',
      icon: 'pi pi-fw pi-list',
      command: () => {
        navigate('/tags');
      },
    },
  ];

  return (
    <div className='flex justify-center items-center '>
      {loggedUser && loggedUser.role === 'admin' ? (
        <>
          <Menu
            model={[...items, ...itemsAdmin]}
            className='w-full md:w-14rem hidden md:block custom-nav-menu '
          />
          <Menu
            model={[...mobileItems, ...itemsAdmin]}
            className='w-full md:w-14rem md:hidden custom-nav-menu '
          />        
        </>
      ) : (
        <>
          <Menu
            model={[...items]}
            className='w-full md:w-14rem hidden md:block custom-nav-menu '
          />
          <Menu
            model={[...mobileItems]}
            className='w-full md:w-14rem md:hidden custom-nav-menu '
          />
        </>
      )}
    </div>
  );
}
