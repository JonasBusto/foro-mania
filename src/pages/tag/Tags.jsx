import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { Link } from 'react-router-dom';
import { useTagAction } from '../../hooks/useTagAction';
import { useTopicAction } from '../../hooks/useTopicAction';
import { Dialog } from 'primereact/dialog';

export function Tags() {
  const { tags, deleteTag } = useTagAction();
  const { topics } = useTopicAction();

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const tagAction = (tag) => {
    const [visible, setVisible] = useState(false);

    const topicsWithTags = topics?.filter((topic) =>
      topic.tagsId?.includes(tag.uid)
    );

    return (
      <span className='flex justify-between'>
        <div className='flex flex-wrap items-center gap-3'>
          <Link
            to={`/tags/upload/${tag.uid}`}
            className='bg-[#1b95d2] hover:bg-[#157ab8] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4'
          >
            <i className='pi pi-pen-to-square'></i>
          </Link>
        </div>
        <>
          <button
            onClick={() => setVisible(true)}
            className='bg-[#1b95d2] hover:bg-[#157ab8] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4'
          >
            <i className='pi pi-trash'></i>
          </button>
          <Dialog
            header='Eliminar tag'
            visible={visible}
            style={{ width: '50vw' }}
            onHide={() => {
              if (!visible) return;
              setVisible(false);
            }}
          >
            {topicsWithTags && topicsWithTags.length > 0 ? (
              <div className='flex flex-col'>
                <p className='text-red-600 font-bold'>
                  El tag #{tag.value} no se puede eliminar ya que esta presente
                  en los siguientes topics:
                </p>
                <div className='flex flex-col'>
                  {topicsWithTags.map((topic, index) => (
                    <Link
                      className='text-blue-400 font-semibold hover:text-blue-600'
                      to={'/topic/' + topic.uid}
                      key={topic.uid}
                    >
                      {index + 1 + '-' + topic.title}{' '}
                      <i className='pi pi-arrow-up-right'></i>
                    </Link>
                  ))}
                </div>
                <div className='mt-5'>
                  <button
                    className='bg-[#1b95d2] hover:bg-[#157ab8] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4'
                    onClick={() => setVisible(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p>¿Esta seguro que desea eliminar este tag?</p>
                <p>
                  <strong>Tag: #</strong>
                  {tag.value}
                </p>
                <div className='mt-5 flex justify-between'>
                  <button
                    className='bg-[#1b95d2] hover:bg-[#157ab8] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4'
                    onClick={() => setVisible(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className='shadow me-5 bg-red-600 hover:bg-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
                    onClick={() => {
                      deleteTag({ id: tag.uid });
                      setVisible(false);
                    }}
                  >
                    Confirmar
                  </button>
                </div>
              </>
            )}
          </Dialog>
        </>
      </span>
    );
  };

  return (
    <section className='max-w-screen-xl mx-auto px-7 mt-5'>
      <div className='bg-black flex px-6 flex-col items-center justify-between p-3 rounded-t-md'>
        <div className='flex items-center flex-wrap flex-row justify-between w-full'>
          <h1 className='text-[30px] uppercase font-semibold text-white'>
            Lista de Tags
          </h1>
          <Link
            to={`/tags/upload`}
            className='bg-[#1b95d2] hover:bg-[#157ab8] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4'
          >
            Agregar Tag
          </Link>
        </div>
        <InputText
          className='bg-gray-50 w-full mt-3 border border-gray-300 text-gray-900 text-sm rounded-none focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Buscar Tag'
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
        paginatorClassName='bg-[#121212] text-white'
        className='mb-5'
        filters={filters}
        rows={5}
        emptyMessage='Sin resultados'
        rowsPerPageOptions={[5, 10, 25, 50]}
        value={tags}
      >
        <Column
          sortable
          field='value'
          header='Nombre'
          style={{ minWidth: '100px' }}
        ></Column>
        <Column
          header='Acciones'
          body={tagAction}
          style={{ width: '150px' }}
        ></Column>
      </DataTable>
    </section>
  );
}
