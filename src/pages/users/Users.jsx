import { Column } from 'primereact/column';
import { useUserAction } from '../../hooks/useUserAction';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { Link } from 'react-router-dom';

export function Users() {
  const { users } = useUserAction();

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const bodyPhotoProfile = (user) => {
    return (
      <span>
        <img
          className='aspect-square w-20 rounded-full'
          src={user.photoProfile}
          alt=''
        />
      </span>
    );
  };

  const userAction = (user) => {
    return (
      <span>
        <Link
          to={`/users/upload/${user.uid}`}
          className='shadow me-5 bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
        >
          Editar
        </Link>
        <button className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'>
          Eliminar
        </button>
      </span>
    );
  };

  return (
    <div className='max-w-screen-xl mx-auto px-7 mt-5'>
      <div className='bg-blue-500 flex flex-col items-center justify-between p-3'>
        <div className='flex items-center justify-between'>
          <p>Lista de Usuarios</p>
          <Link
            className='flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded'
            to='/users/upload'
          >
            Agregar
          </Link>
        </div>
        <InputText
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Buscar Usuario'
          onInput={(e) => {
            setFilters({
              global: {
                value: e.target.value,
                matchMode: FilterMatchMode.CONTAINS,
              },
            });
          }}
        />
      </div>
      <DataTable
        paginator
        stripedRows
        removableSort
        selectionMode='single'
        scrollable
        filters={filters}
        rows={5}
        emptyMessage='Sin resultados'
        rowsPerPageOptions={[5, 10, 25, 50]}
        value={users}
      >
        <Column
          header='Foto'
          body={bodyPhotoProfile}
          style={{ width: '100px' }}
        ></Column>
        <Column sortable field='fullName' header='Nombre'></Column>
        <Column sortable field='email' header='Email'></Column>
        <Column sortable field='role' header='Rol'></Column>
        <Column header='Acciones' body={userAction}></Column>
      </DataTable>
    </div>
  );
}
