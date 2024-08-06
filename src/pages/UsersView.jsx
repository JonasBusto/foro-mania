import React, { useEffect, useRef, useState } from 'react'
import { useUserAction } from '../hooks/useUserAction';
import { useTopicAction } from '../hooks/useTopicAction';
import UserCard from '../components/users/UserCard';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Link } from 'react-router-dom';
import { Banner } from '../components/home/Banner';
import { TablaDeUsuarios } from '../components/users/tabla-de-usuarios';
import '../styles/usersView.css'


export const UsersView = () => {

    const { users, allUsersStatus } = useUserAction()
    const { TopicsGlobalStatus, topics } = useTopicAction()

    const [modalSwitch, setModalSwitch] = useState(false)
    const [currentUserSelected, setCurrentUserSelected] = useState(null)
    const [modalPosition, setModalPosition] = useState({ top: '0px', left: '0px' });

    const modalRef = useRef(null);

    useEffect(() => {
        console.log(topics);
        
    }, [topics])


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


  return (
    <main className='bg-[#121212] mb-12'>
        <Banner />
        {
            allUsersStatus === 'Cargando' &&
            <div className="min-h-[50vh] flex items-center">
                <ProgressSpinner />
            </div>
        }

        {
            allUsersStatus === 'Exitoso' &&
            <div className='p-6'>
                <TablaDeUsuarios 
                    users={users}
                    allUsersStatus={allUsersStatus}
                    topics={topics}
                    TopicsGlobalStatus={TopicsGlobalStatus}
                    selectionChange={selectionChange}
                />
            </div>
        }

        {
            modalSwitch && 
            <article ref={modalRef} style={{ position: 'absolute', top: modalPosition.top, left: modalPosition.left }}>
                <UserCard userProps={currentUserSelected}/>
            </article>
        }

        {
            allUsersStatus === 'Fallido' &&
            <div className="card flex justify-content-center">
                <p>Parece que algo nos falta.</p>
                <Link to={'/'}>Volver a home</Link>
            </div>
        }

    </main>
  )
}