import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserAction } from '../../hooks/useUserAction';
import { Banner } from '../../components/home/Banner';
import { PublicProfileCard } from '../../components/users/PublicProfileCard';
import { UserTabs } from '../../components/users/UserTabs';
import { UserTopics } from '../../components/users/UserTopics';
import { useTopicAction } from '../../hooks/useTopicAction';
import { useReactionAction } from '../../hooks/useReactionAction';
import { UserReactions } from '../../components/users/UserReactions';
import { Loader } from '../../components/items/Loader';
import useDocTitle from '../../hooks/useDocTitle';
import { STATUS_SLICE_STORE } from '../../helpers/constants';

export const UsersSummary = () => {
  const { id } = useParams();

  const { getUser, users, user, userStatus } = useUserAction();
  const { topics } = useTopicAction();
  const { reactions, statusReactions } = useReactionAction();

  const [tab, setTab] = useState('TOPICS');

  if (!user) {
    useDocTitle('Foromanía | Perfil de Usuario');
  }

  if (user) {
    useDocTitle(`Foromanía | ${user.fullName}`);
  }

  useEffect(() => {
    getUser({ id });
  }, [id]);

  if (
    userStatus === STATUS_SLICE_STORE.IDLE ||
    userStatus === STATUS_SLICE_STORE.LOADING
  ) {
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
          className='flex justify-evenly mb-4 w-full px-4 gap-4'
        >
          <UserTabs tab={tab} setTab={setTab} />
        </div>

        <section
          role='region'
          aria-label='Contenido de pestañas'
          className='flex flex-col items-center w-full pb-10'
        >
          {tab === 'TOPICS' && (
            <div
              id='topicos-panel'
              role='tabpanel'
              aria-labelledby='topicos-tab'
              className='w-full max-w-7xl flex flex-col gap-4 p-4'
            >
              <UserTopics userProps={user} topics={topics} />
            </div>
          )}
          {tab === 'MESSAGES' && (
            <div
              id='mensajes-panel'
              role='tabpanel'
              aria-labelledby='mensajes-tab'
              className='w-full max-w-7xl flex flex-col gap-4 p-4'
            >
              <UserReactions
                userProps={user}
                reactions={reactions}
                topics={topics}
                users={users}
              />
            </div>
          )}
        </section>
      </>
    </main>
  );
};
