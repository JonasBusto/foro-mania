import { useEffect, useRef, useState } from 'react';
import { useUserAction } from '../../hooks/useUserAction';
import { useTopicAction } from '../../hooks/useTopicAction';
import { UserCard } from '../../components/users/UserCard';
import { Link } from 'react-router-dom';
import { Banner } from '../../components/home/Banner';
import { Loader } from '../../components/items/Loader';
import { UsersList } from '../../components/users/UsersList';
import '../../styles/usersView.css';


export const UsersView = () => {
  const { users, allUsersStatus } = useUserAction();
  const { TopicsGlobalStatus, topics } = useTopicAction();

  const [modalSwitch, setModalSwitch] = useState(false);
  const [currentUserSelected, setCurrentUserSelected] = useState(null);
  const [modalPosition, setModalPosition] = useState({
    top: '0px',
    left: '0px',
  });

  const modalRef = useRef(null);

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
    setModalSwitch(false);
  };

  const selectionChange = (user, event) => {
    if (currentUserSelected) {
      if (user.uid === currentUserSelected.uid) {
        setCurrentUserSelected(null);
        return modalSwitchOff;
      }
    }

    setCurrentUserSelected(user);

    if (window.innerWidth < 768) {
      setModalPosition({ top: '10%', left: '10%' });
      return setModalSwitch(true);
    }

    const adjustedLeft = event.clientX + window.scrollX + 50;
    const adjustedTop = event.clientY + window.scrollY - 150;

    setModalPosition({ top: `${adjustedTop}px`, left: `${adjustedLeft}px` });
    return setModalSwitch(true);
  };

  if (allUsersStatus === 'Cargando') {
    return <Loader />;
  }

  return (
    <main className='bg-[#121212] mb-12'>
      <Banner />

      <div className='p-6'>
        <UsersList
          users={users}
          allUsersStatus={allUsersStatus}
          topics={topics}
          TopicsGlobalStatus={TopicsGlobalStatus}
          selectionChange={selectionChange}
        />
      </div>

      {modalSwitch && (
        <article
          ref={modalRef}
          style={{
            position: 'absolute',
            top: modalPosition.top,
            left: modalPosition.left,
          }}
        >
          <UserCard currentUser={currentUserSelected} topics={topics} />
        </article>
      )}

      {allUsersStatus === 'Fallido' && (
        <div className='card flex justify-content-center'>
          <p>Parece que algo nos falta.</p>
          <Link to={'/'}>Volver a home</Link>
        </div>
      )}
    </main>
  );
};
