import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserAction } from '../hooks/useUserAction';
import { Banner } from '../components/home/Banner';
import { PublicProfileCard } from '../components/users/PublicProfileCard';
import { UserTabs } from '../components/users/UserTabs';
import { UserTopics } from '../components/users/UserTopics';
import { useTopicAction } from '../hooks/useTopicAction';
import { FavTopics } from '../components/users/FavTopics';
import Loader from '../utils/Loader';

export const UsersSummary = () => {
  const { id } = useParams();

  const { getUser, user, userStatus } = useUserAction();
  const { topics } = useTopicAction();

  const [tab, setTab] = useState('TOPICS');

  useEffect(() => {
    getUser({ id });
  }, []);

  if (userStatus === 'Inactivo' || userStatus === 'Cargando') {
    return <Loader />;
  }

  return (
    <main className='bg-[#121212] text-[#e5e5e5] min-h-dvh'>
      <Banner />

      <>
        <article className='px-10 relative -top-20'>
          <PublicProfileCard userProps={user} />
        </article>

        <div
          role='tablist'
          aria-labelledby='Opciones de visualización'
          className='flex justify-evenly mb-4 w-full'
        >
          <UserTabs tab={tab} setTab={setTab} />
        </div>

        <section
          role='region'
          aria-label='Contenido de pestañas'
          className='flex flex-col items-center p-4 w-full'
        >
          {tab === 'TOPICS' && (
            <div
              id='topicos-panel'
              role='tabpanel'
              aria-labelledby='topicos-tab'
              className='w-full max-w-7xl flex flex-col gap-4'
            >
              <UserTopics userProps={user} topics={topics} />
            </div>
          )}
          {tab === 'MESSAGES' && (
            <div
              id='mensajes-panel'
              role='tabpanel'
              aria-labelledby='mensajes-tab'
              className='w-full max-w-7xl flex flex-col gap-4'
            >
              <FavTopics userProps={user} topics={topics} />
            </div>
          )}
        </section>
      </>
    </main>
  );
};
