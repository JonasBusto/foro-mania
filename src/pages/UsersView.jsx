import React, { useState } from 'react'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import '../styles/usersView.css'

export const UsersView = () => {

    const [modalSwitch, setModalSwitch] = useState(false)
    const [globalFilter, setGlobalFilter] = useState(null);

    const users = [
        {
            username: 'usuario1',
            email: 'usuario1@gmail.com',
            image: '/img/avatar_168725.png',
            id: 1,
            recibidos: 4,
            dados: 2,
            topicosCreados: 1
        },
        {
            username: 'usuario2',
            email: 'usuario2@gmail.com',
            image: '/fm-favicon.png',
            id: 2,
            recibidos: 2,
            dados: 8,
            topicosCreados: 0
        },
        {
            username: 'usuario3',
            email: 'usuario3@gmail.com',
            image: '/img/avatar_147135.png',
            id: 3,
            recibidos: 6,
            dados: 1,
            topicosCreados: 1
        }
    ]

    const representativeBodyTemplate = (rowData) => {

        return (
            <div className="flex items-center gap-2">
                <img alt={rowData.username} src={rowData.image} 
                style={{ width: '32px', height: '32px' }} 
                className='rounded-full ring-2'/>
                <span className='pl-1 text-[16px]'>{rowData.username}</span>
            </div>
        );
    };

    const onGlobalFilterChange = (event) => {

        const value = event.target.value;
        setGlobalFilter(value);
    };

    const renderHeader = () => {
        const value = globalFilter ? globalFilter : '';

        return (
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText className='p-2 pl-10 text-neutral-200' type="search" value={value || ''} onChange={(e) => onGlobalFilterChange(e)} placeholder="Buscar Usuarios" />
            </IconField>                
        );
    };

    const header = renderHeader();

  return (
    <div className='flex items-center justify-center w-full bg-neutral-700 p-10'>

    <DataTable value={users} 
        paginator
        rows={10} 
        paginatorClassName='bg-neutral-800 text-white'
        header={header}
        filters={globalFilter}           
        onFilter={(e) => setGlobalFilter(e.filters)}
        // selection={selectedCustomer} 
        // onSelectionChange={(e) => setSelectedCustomer(e.value)}
        selectionMode="single" 
        dataKey="id"
        stateStorage="session" 
        stateKey="dt-state-demo-local" 
        emptyMessage="No se encontraron resultados" 
    >
        <Column headerClassName='column-header' header="Usuario" body={representativeBodyTemplate} sortable sortField='username' className='column-row'></Column>
        <Column headerClassName='column-header' field="topicosCreados" header="Tópicos Creados" sortable className='column-row'></Column>
        <Column headerClassName='column-header' field='recibidos' header="🩷 Recibidos" sortable className='column-row'></Column>
        <Column headerClassName='column-header' field='dados' header="🩷 Dados" sortable className='column-row' ></Column>

    </DataTable>


    </div>
  )
}
