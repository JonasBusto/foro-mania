import { Menu } from 'primereact/menu';
import { useNavigate } from 'react-router-dom';
import { USER_ROLE } from '../../helpers/constants';

export function NavMenu({ loggedUser, handleMenu }) {
  const navigate = useNavigate();

  const pathNavigate = (url) => {
    navigate(url);
    handleMenu();
  };

  const itemRenderer = (item) => {
    return (
      <div className='p-menuitem-content'>
        <div
          onClick={item.command}
          className='flex align-items-center p-menuitem-link'
        >
          <span className={item.icon} />
          <span className='mx-2'>{item.label}</span>
        </div>
      </div>
    );
  };

  const items = [
    {
      template: itemRenderer,
      label: 'Ultimos',
      icon: 'pi pi-fw pi-clock',
      command: () => {
        pathNavigate('/topic-list?orderBy=last');
      },
    },
    {
      template: itemRenderer,
      label: 'Top',
      icon: 'pi pi-fw pi-star',
      command: () => {
        pathNavigate('/topic-list?orderBy=top');
      },
    },
    {
      template: itemRenderer,
      label: 'Usuarios',
      icon: 'pi pi-fw pi-users',
      command: () => {
        pathNavigate('/users-view');
      },
    },
    {
      template: itemRenderer,
      label: 'Categorias',
      icon: 'pi pi-fw pi-list',
      command: () => {
        pathNavigate('/all-categories');
      },
    },
  ];

  const mobileItems = [
    {
      template: itemRenderer,
      label: 'Inicio',
      icon: 'pi pi-fw pi-home',
      command: () => {
        pathNavigate('/');
      },
    },
    {
      template: itemRenderer,
      label: 'Ultimos',
      icon: 'pi pi-fw pi-clock',
      command: () => {
        pathNavigate('/topic-list?orderBy=last');
      },
    },
    {
      template: itemRenderer,
      label: 'Top',
      icon: 'pi pi-fw pi-star',
      command: () => {
        pathNavigate('/topic-list?orderBy=top');
      },
    },
    {
      template: itemRenderer,
      label: 'Usuarios',
      icon: 'pi pi-fw pi-users',
      command: () => {
        pathNavigate('/users-view');
      },
    },
    {
      template: itemRenderer,
      label: 'Categorias',
      icon: 'pi pi-fw pi-list',
      command: () => {
        pathNavigate('/all-categories');
      },
    },
  ];

  const itemsAdmin = [
    {
      template: itemRenderer,
      label: 'Gestionar Categorias',
      icon: 'pi pi-fw pi-list',
      command: () => {
        pathNavigate('/categories');
      },
    },
    {
      template: itemRenderer,
      label: 'Gestionar Tags',
      icon: 'pi pi-fw pi-list',
      command: () => {
        pathNavigate('/tags');
      },
    },
  ];

  return (
    <div className='flex justify-center items-center'>
      {loggedUser && loggedUser.role === USER_ROLE.ADMINISTRATOR ? (
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
            className='w-full md:w-14rem hidden md:block custom-nav-menu'
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
