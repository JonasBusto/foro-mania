import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { Link } from 'react-router-dom';
import { useCategoryAction } from '../../hooks/useCategoryAction';
import { Dialog } from 'primereact/dialog';

export function Categories() {
  const { categories, deleteCategory } = useCategoryAction();

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const bodyColor = (category) => {
    return (
      <span>
        <div
          className='w-10 h-10 border-x-2 border-y-2 border-black'
          style={{ backgroundColor: category.color }}
        ></div>
      </span>
    );
  };

  const categoryAction = (category) => {
    const [visible, setVisible] = useState(false);
    return (
      <span>
        <Link
          to={`/categories/upload/${category.uid}`}
          className='shadow me-5 bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
        >
          Editar
        </Link>
        <>
          <button
            onClick={() => setVisible(true)}
            className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
          >
            Eliminar
          </button>
          <Dialog
            header='Eliminar categoria'
            visible={visible}
            style={{ width: '35vw' }}
            onHide={() => {
              if (!visible) return;
              setVisible(false);
            }}
          >
            <p>¿Esta seguro que desea eliminar esta categoria?</p>
            <p>
              <strong>Categoria: </strong>
              {category.title}
            </p>
            <div className='mt-5 flex justify-between'>
              <button
                className='shadow me-5 bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
                onClick={() => setVisible(false)}
              >
                Cancelar
              </button>
              <button
                className='shadow me-5 bg-red-600 hover:bg-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
                onClick={() => {
                  deleteCategory({ id: category.uid });
                  setVisible(false);
                }}
              >
                Confirmar
              </button>
            </div>
          </Dialog>
        </>
      </span>
    );
  };

  return (
    <div className='max-w-screen-xl mx-auto px-7 mt-5'>
      <div className='bg-blue-500 flex flex-col items-center justify-between p-3'>
        <div className='flex items-center justify-between'>
          <p>Lista de Categorias</p>
          <Link
            to={`/categories/upload`}
            className='shadow me-5 bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
          >
            Agregar
          </Link>
        </div>
        <InputText
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Buscar Categoria'
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
        value={categories}
      >
        <Column
          sortable
          field='title'
          header='Titulo'
          style={{ minWidth: '200px' }}
        ></Column>
        <Column
          sortable
          field='description'
          header='Descripción'
          style={{ minWidth: '270px' }}
        ></Column>
        <Column
          body={bodyColor}
          header='Color'
          style={{ minWidth: '100px' }}
        ></Column>
        <Column header='Acciones' body={categoryAction}></Column>
      </DataTable>
    </div>
  );
}
