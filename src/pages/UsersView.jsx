import React, { useEffect, useRef, useState } from 'react'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { useUserAction } from '../hooks/useUserAction';
import UserCard from '../components/users/UserCard';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Link } from 'react-router-dom';
import '../styles/usersView.css'
import { Banner } from '../components/home/Banner';

export const UsersView = () => {

    const { users, allUsersStatus } = useUserAction()

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

        if (window.innerWidth < 768) {
            setModalPosition({ top: '10%', left: '10%' })
            return setModalSwitch(true)
        }        

        const adjustedLeft = event.clientX + window.scrollX + 50;
        const adjustedTop = event.clientY + window.scrollY - 100;

        setModalPosition({ top: `${adjustedTop}px`, left: `${adjustedLeft}px` })
        return setModalSwitch(true)
    }

    const representativeBodyTemplate = (rowData) => {
        return (
            <div className="flex items-center gap-2 cursor-pointer" onClick={(event) => selectionChange(rowData, event)}>
                <img alt={`imagen de perfil de usuario ${rowData.fullName}`} src={rowData.photoProfile} 
                style={{ width: '56px', height: '56px' }} 
                className='rounded-full ring-2'/>
                <span className='pl-3 text-[17px]'>{rowData.fullName}</span>
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
    <main className='bg-[#121212]'>
        <Banner />

        {
            allUsersStatus === 'Cargando' &&
            <div className="min-h-[50vh] flex items-center">
                <ProgressSpinner />
            </div>
        }
        {
            allUsersStatus === 'Exitoso' &&
            <DataTable value={users} 
                paginator
                rows={10} 
                paginatorClassName='bg-[#2a2a2a] text-white'
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
        }
        {
            allUsersStatus === 'Fallido' &&
            <div className="card flex justify-content-center">
                <p>Parece que algo nos falta.</p>
                <Link to={'/'}>Volver a home</Link>
            </div>
        }


        {
            modalSwitch && 
            <article ref={modalRef} style={{ position: 'absolute', top: modalPosition.top, left: modalPosition.left }}>
                <UserCard userProps={currentUserSelected}/>
            </article>
        }
    </main>
  )
}