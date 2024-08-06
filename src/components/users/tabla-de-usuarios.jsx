import React, { useEffect, useState } from 'react'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { useReactionAction } from '../../hooks/useReactionAction';


export const TablaDeUsuarios = ({users, allUsersStatus, selectionChange, topics, TopicsGlobalStatus}) => {

    const { reactions, statusReactions, getReaction, reaction } = useReactionAction()

    const [emptyMessage, setEmptyMessage] = useState(null)
    const [globalFilter, setGlobalFilter] = useState('')


    // useEffect(() => {
    //     if (statusReactions === 'Exitoso' ) {
    //         console.log(reactions[0].uid)
    //     }
    // }, [reactions])


    const fullUsersData = users.map(user => {

        if (statusReactions === 'Exitoso' && TopicsGlobalStatus === 'Exitoso' ) {

            const userReactions = reactions.filter(reaction =>
               reaction.userId === user.uid                
            )
            const userTopics = topics.filter(topic =>
                topic.userId === user.uid                
            )


            const likesCount = userReactions.filter(reaction => 
                reaction.type === 'like').length
            const unlikesCount = userReactions.filter(reaction => 
                reaction.type === 'unlike').length
            const topicsCount = userTopics.length;

            return {
                ...user,
                likesGiven: likesCount,
                unlikesGiven: unlikesCount,
                topicsCount: topicsCount
            }            
        }
        
        return {
            ...user,
            likesGiven: '',
            unlikesGiven: '',
            topicsCount: ''

        }
    })
      

    useEffect(() => {
        if (allUsersStatus !== 'Cargando') {
            setEmptyMessage('No se encontraron resultados')
        }
    }, [allUsersStatus])

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

    const likeUnlikeHeader = (textcontent, like) => {

        return (
            <>
                <i className={`pi pi-thumbs-${like ? 'up' : 'down'}`}>
                </i> <span>{textcontent}</span>
            </>
        )
    }


  return (
    <>
        <DataTable value={fullUsersData} 
            paginator
            rows={10} 
            paginatorClassName='bg-[#121212] text-white'
            header={header}
            globalFilterFields={['fullName']}
            filters={{ 'global': { value: globalFilter, matchMode: 'contains' } }}
            selectionMode="single" 
            dataKey="uid"
            stateStorage="session" 
            stateKey="dt-state-demo-local"
            emptyMessage={emptyMessage ?? ' '}
        >
            <Column headerClassName='column-header' header="Usuario" body={representativeBodyTemplate} sortable sortField='fullName' className='column-row' style={{width: '25%'}}></Column>

            {/* <Column headerClassName='column-header' field='likesRecived' header={() => likeUnlikeHeader('Recibidos', true)} sortable className='column-row'></Column> */}
            <Column headerClassName='column-header' field='likesGiven' header={() => likeUnlikeHeader('Enviados', true)} sortable className='column-row' ></Column>
            {/* <Column headerClassName='column-header' field='unlikesRecived' header={() => likeUnlikeHeader('Recibidos', false)} sortable className='column-row'></Column> */}
            <Column headerClassName='column-header' field='unlikesGiven' header={() => likeUnlikeHeader('Enviados', false)} sortable className='column-row' ></Column>

            <Column headerClassName='column-header' field='topicsCount' header="Tópicos Creados" sortable className='column-row'></Column>

        </DataTable>
    </>
  )
}
