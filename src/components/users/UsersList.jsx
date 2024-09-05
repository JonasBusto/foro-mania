import { useEffect, useState } from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { useReactionAction } from '../../hooks/useReactionAction';
import { userFullDataExtract } from '../../helpers/Actions';
import { Loader } from '../items/Loader';
import { SvgIconAdmin } from '../items/SvgIconAdmin';
import { STATUS_SLICE_STORE, USER_ROLE } from '../../helpers/constants';

export const UsersList = ({
  users,
  allUsersStatus,
  selectionChange,
  topics,
  TopicsGlobalStatus,
}) => {
  const { reactions, statusReactions } = useReactionAction();

  const [emptyMessage, setEmptyMessage] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const sortOrder = 1;
  const sortField = 'fullName';

  const fullUsersData = userFullDataExtract(
    users,
    reactions,
    topics,
    statusReactions,
    TopicsGlobalStatus
  );

  useEffect(() => {
    if (allUsersStatus !== STATUS_SLICE_STORE.LOADING) {
      setEmptyMessage('No se encontraron resultados');
    } else {
      <Loader />;
    }
  }, [allUsersStatus]);

  const representativeBodyTemplate = (rowData) => {
    return (
      <div
        className='flex items-center gap-2 cursor-pointer'
        onClick={(event) => selectionChange(rowData, event)}
      >
        <span className='relative flex flex-col justify-center'>
          {rowData.role === USER_ROLE.ADMINISTRATOR && (
            <SvgIconAdmin
              width='36px'
              height='36px'
              stylesCustom='absolute left-2.5 bottom-10'
            />
          )}
          <img
            alt={`imagen de perfil de usuario ${rowData.fullName}`}
            src={rowData.photoProfile}
            style={{ width: '56px', height: '56px' }}
            className='rounded-full ring-2 object-cover'
            draggable={false}
          />
        </span>
        <span className='pl-3 text-[17px]'>{rowData.fullName}</span>
      </div>
    );
  };

  const onGlobalFilterChange = (event) => {
    setGlobalFilter(event.target.value);
  };

  const renderHeader = () => {
    const value = globalFilter ? globalFilter : '';

    return (
      <IconField iconPosition='left'>
        <InputIcon className='pi pi-search' />
        <InputText
          className='w-full p-2 pl-10 bg-[#282828] border-[#61dafb] text-neutral-200 rounded-sm leading-6 shadow-none'
          type='search'
          value={globalFilter}
          onChange={onGlobalFilterChange}
          placeholder='Buscar Usuarios'
        />
      </IconField>
    );
  };

  const header = renderHeader();

  const likeUnlikeHeader = (textcontent, like) => {
    return (
      <>
        <i className={`pi pi-thumbs-${like ? 'up' : 'down'}`}></i>
        <span> {textcontent}</span>
      </>
    );
  };

  return (
    <>
      <DataTable
        value={fullUsersData}
        paginator
        rows={7}
        paginatorClassName='bg-[#121212] text-white'
        header={header}
        globalFilterFields={['fullName']}
        filters={{ global: { value: globalFilter, matchMode: 'contains' } }}
        selectionMode='single'
        dataKey='uid'
        stateStorage='session'
        stateKey='dt-state-demo-local'
        emptyMessage={emptyMessage ?? ' '}
        sortField={sortField}
        sortOrder={sortOrder}
        className='datable-user-list'
      >
        <Column
          headerClassName='column-header'
          header='Usuario'
          body={representativeBodyTemplate}
          sortable
          sortField='fullName'
          className='column-row hover:font-medium hover:text-white'
          style={{ width: '25%', minWidth: 240 }}
        ></Column>
        <Column
          headerClassName='column-header'
          field='likesGiven'
          header={() => likeUnlikeHeader('Enviados', true)}
          sortable
          className='column-row'
        ></Column>
        <Column
          headerClassName='column-header'
          field='unlikesGiven'
          header={() => likeUnlikeHeader('Enviados', false)}
          sortable
          className='column-row'
        ></Column>
        <Column
          headerClassName='column-header'
          field='topicsCount'
          header='Tópicos Creados'
          sortable
          className='column-row'
        ></Column>
      </DataTable>
    </>
  );
};
