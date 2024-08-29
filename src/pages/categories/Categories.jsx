import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { Link } from 'react-router-dom';
import { useCategoryAction } from '../../hooks/useCategoryAction';
import { Dialog } from 'primereact/dialog';

export function Categories() {
  const { categories, enableCategory, disableCategory } = useCategoryAction();
  const [visible, setVisible] = useState(false);
  const [categoryToModify, setCategoryToModify] = useState(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const handleConfirmEnable = async () => {
    if (categoryToModify) {
      await enableCategory({ id: categoryToModify.uid });
      setVisible(false);
    }
  };

  const handleOpenDialog = (category) => {
    setCategoryToModify(category);
    setVisible(true);
  };

  const handleConfirmDisable = () => {
    if (categoryToModify) {
      disableCategory({ id: categoryToModify.uid });
      setVisible(false);
    }
  };

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
    return (
      <span>
        <div className='flex flex-wrap items-center gap-3'>
          <Link
            to={`/categories/upload/${category.uid}`}
            className='bg-[#1b95d2] hover:bg-[#157ab8] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4'
          >
            <i className='pi pi-pen-to-square'></i>
          </Link>

          <button
            onClick={() => handleOpenDialog(category)}
            className='bg-[#1b95d2] hover:bg-[#157ab8] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4'
          >
            {category.isActive ? (
              <i className='pi pi-pause'></i>
            ) : (
              <i className='pi pi-play'></i>
            )}
          </button>
        </div>
      </span>
    );
  };

  return (
    <section className='max-w-screen-xl mx-auto px-7 mt-5'>
      <div className='bg-black flex px-6 flex-col items-center justify-between p-3 rounded-t-md'>
        <div className='flex items-center flex-wrap flex-row justify-between w-full'>
          <h1 className='text-[30px] uppercase font-semibold text-white'>
            Lista de Categorías
          </h1>
          <Link
            to={`/categories/upload`}
            className='bg-[#1b95d2] hover:bg-[#157ab8] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4'
          >
            Agregar Categoría
          </Link>
        </div>
        <InputText
          className=' bg-gray-50 w-full mt-3 border border-gray-300 text-gray-900 text-sm rounded-none focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Buscar Categoría'
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
        paginatorClassName='bg-[#121212] text-white'
        className='mb-5'
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
          header='Título'
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
        <Column
          header='Acciones'
          body={categoryAction}
          style={{ minWidth: '150px' }}
        ></Column>
      </DataTable>
      <Dialog
        header='Modificar Estado de la Categoría'
        visible={visible}
        style={{ width: '70vw' }}
        onHide={() => setVisible(false)}
      >
        {categoryToModify && (
          <div className='flex flex-col flex-wrap items-center justify-around'>
            <p className=''>
              ¿Está seguro que desea
              {categoryToModify.isActive ? ' inhabilitar ' : ' habilitar '}
              la categoría
              <strong> {categoryToModify.title} </strong>?
            </p>
            <div className='flex flex-row items-center justify-around gap-3 mt-5'>
              <button
                onClick={
                  categoryToModify.isActive
                    ? handleConfirmDisable
                    : handleConfirmEnable
                }
                className='shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
              >
                {categoryToModify.isActive ? 'Inhabilitar' : 'Habilitar'}
              </button>
              <button
                onClick={() => setVisible(false)}
                className='shadow bg-gray-500 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </Dialog>
    </section>
  );
}
