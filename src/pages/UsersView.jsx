import React, { useEffect, useRef, useState } from 'react'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { useUserAction } from '../hooks/useUserAction';
import '../styles/usersView.css'
import UserCard from '../components/users/UserCard';

export const UsersView = () => {

    const { users } = useUserAction()

    const [modalSwitch, setModalSwitch] = useState(false)
    const [globalFilter, setGlobalFilter] = useState('')
    const [emptyMessage, setEmptyMessage] = useState(null)
    const [currentUserSelected, setCurrentUserSelected] = useState(null)
    const [modalPosition, setModalPosition] = useState({ top: '0px', left: '0px' });

    const modalRef = useRef(null);

    useEffect(() => {
        if (users.length > 0) {
            setEmptyMessage('No se encontraron resultados')
        }
    }, [users])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                modalSwitchOff();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const modalSwitchOff = () => {
        setModalSwitch(false)
    }

    const selectionChange = (user, event) => {
        modalSwitchOff()

        setCurrentUserSelected(user)
        setModalPosition({ top: `${event.clientY}px`, left: `${event.clientX}px` });
        return setModalSwitch(true)
    }

    const representativeBodyTemplate = (rowData) => {
        return (
            <div className="flex items-center gap-2 cursor-pointer" onClick={(event) => selectionChange(rowData, event)}>
                <img alt={`imagen de perfil de usuario ${rowData.fullName}`} src={rowData.photoProfile} 
                style={{ width: '36px', height: '36px' }} 
                className='rounded-full ring-2'/>
                <span className='pl-1 text-[16px]'>{rowData.fullName}</span>
            </div>
        )
    }

    const onGlobalFilterChange = (event) => {
        setGlobalFilter(event.target.value)
    }

    const renderHeader = () => {
        const value = globalFilter ? globalFilter : ''

        return (
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText className='p-2 pl-10 bg-[#282828] border-[#61dafb] border-2 text-neutral-200 rounded-md' type="search" value={globalFilter} onChange={onGlobalFilterChange} placeholder="Buscar Usuarios" />
            </IconField>
        )
    }

    const header = renderHeader()


  return (
    <div className='flex flex-col items-center justify-center w-full bg-neutral-700 p-10'>

    <DataTable value={users} 
        paginator
        rows={10} 
        paginatorClassName='bg-neutral-800 text-white'
        header={header}
        globalFilterFields={['fullName']}
        filters={{ 'global': { value: globalFilter, matchMode: 'contains' } }}
        selectionMode="single" 
        dataKey="uid"
        stateStorage="session" 
        stateKey="dt-state-demo-local"
        emptyMessage={emptyMessage ?? ' '}
    >
        <Column headerClassName='column-header' header="Usuario" body={representativeBodyTemplate} sortable sortField='fullName' className='column-row'></Column>
        <Column headerClassName='column-header' field='topicosCreados' header="Tópicos Creados" sortable className='column-row'></Column>
        <Column headerClassName='column-header' field='recibidos' header="🩷 Recibidos" sortable className='column-row'></Column>
        <Column headerClassName='column-header' field='dados' header="🩷 Dados" sortable className='column-row' ></Column>

    </DataTable>

    {
        modalSwitch && 
        <article ref={modalRef} style={{ position: 'absolute', top: modalPosition.top, left: modalPosition.left }}>
            <UserCard user={currentUserSelected}/>
        </article>
    }


    </div>
  )
}