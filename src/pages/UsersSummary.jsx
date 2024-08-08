import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUserAction } from '../hooks/useUserAction'
import { Banner } from '../components/home/Banner'
import { PublicProfileCard } from '../components/users/user-public-profile-card'
import { ProgressSpinner } from 'primereact/progressspinner'
import { UserTabs } from '../components/users/UserTabs'
import { UserTopics } from '../components/users/user-topics'
import { useTopicAction } from '../hooks/useTopicAction'
import { FavTopics } from '../components/users/fav-topics'

export const UsersSummary = () => {

    const {id} = useParams()

    const { getUser, user, userStatus } = useUserAction()
    const { TopicsGlobalStatus, topics } = useTopicAction()

    const [tab, setTab] = useState('TOPICS')

    useEffect(() => {
      getUser({id: id})
    }, [])


  return (
    <main  className='bg-[#121212] text-[#e5e5e5] min-h-dvh'>
      <Banner />

      {
        userStatus === 'Cargando' &&
        <div className="min-h-[50vh] flex items-center">
            <ProgressSpinner />
        </div>
      }

      {
        userStatus === 'Exitoso' &&
        <>
          <article className='px-10 relative -top-20'>
            <PublicProfileCard userProps={user}/>
          </article>

          <div role="tablist" aria-labelledby='Opciones de visualización' className="flex justify-evenly mb-4 w-full">
            <UserTabs tab={tab} setTab={setTab}/>
          </div>

          <section role='region' aria-label="Contenido de pestañas" className='flex flex-col items-center p-4 w-full'>
            {
              tab === 'TOPICS' &&
              <div id="topicos-panel" role="tabpanel" aria-labelledby="topicos-tab" className='w-full max-w-7xl flex flex-col gap-4'>
                <UserTopics 
                  userProps={user}
                  topics={topics}
                />
              </div>
            }
            {
              tab === 'MESSAGES' &&
              <div id="mensajes-panel" role="tabpanel" aria-labelledby="mensajes-tab" className='w-full max-w-7xl flex flex-col gap-4'>
                <FavTopics 
                  userProps={user}
                  topics={topics}
                />
              </div>
            }
          </section>        
        </>
      }

    </main>
  )
}
