import React, { useEffect, useState } from 'react';
import usuario1 from '/img/avatar_168725.png';
import { comentarios } from './comentariosData';
import TopicComment from './TopicComment';
import AddCommentForm from './AddComentForm';
import ReactionButton from '../../components/buttons/ReactionButton';
import { useParams } from 'react-router-dom';
import { useTopicAction } from '../../hooks/useTopicAction';
import { useAuth } from '../../hooks/useAuth';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { useUserAction } from '../../hooks/useUserAction';
import { useCommentAction } from '../../hooks/useCommentAction';

const Topic = () => {
  const { id } = useParams();
  const { getTopic, topic, statusTopic } = useTopicAction();
  const { user, getUser, userStatus } = useUserAction();
  const { loggedUser } = useAuth();
  const { fetchComments, allComments } = useCommentAction();

  const TimeToNow = (fecha) => {
    const fechaISO = parseISO(fecha);
    return formatDistanceToNow(fechaISO, { locale: es });
  };

  useEffect(() => {
    if (id) {
      getTopic(id);
    }

    fetchComments(id);
  }, []);

  useEffect(() => {
    if (topic) {
      getUser({ id: topic.userId });
    }
  }, [topic]);

  if (
    statusTopic === 'Inactivo' ||
    statusTopic === 'Cargando' ||
    userStatus === 'Inactivo' ||
    userStatus === 'Cargando'
  ) {
    return <h1 className='text-white'>Cargando...</h1>;
  }

  return (
    <div className='bg-neutral-800 py-10 text-neutral-200 px-3 '>
      <div className='max-w-[75rem] mx-auto'>
        <div className='bg-white w-full h-28'>
          <img src='#' alt='img-adversiting' />
        </div>
        <div>
          <div className='border-b border-neutral-700 py-4'>
            <h2 className='text-3xl font-semibold'>{topic.title}</h2>
            <p className='text-neutral-400'>{topic.category}</p>
          </div>
          <div className='py-3 flex justify-between'>
            <div className='flex gap-4'>
              <img
                src={user.photoProfile}
                alt='Imagen de usuario'
                className='w-12 h-12 object-cover rounded-full'
              />
              <div>
                <h3 className='font-semibold text-lg'>{user.fullName}</h3>
                <p className='text-sm text-neutral-400'>{user.email}</p>
              </div>
            </div>
            <div>
              <p>{TimeToNow(topic.createdAt)}</p>
            </div>
          </div>
          <div className='leading-loose'>
            <div>{topic.content}</div>
          </div>
          <div className='flex flex-col md:flex-row justify-between border border-neutral-600 bg-neutral-700 px-4 py-2 md:items-center my-8'>
            <div className='flex gap-4 mb-4 md:mb-0'>
              <div className='text-center'>
                <p className='text-lg'>{TimeToNow(topic.createdAt)}</p>
                <p className='text-sm'>creado</p>
              </div>
              <div className='text-center'>
                <p className='text-lg'>3</p>
                <p className='text-sm'>respuestas</p>
              </div>
            </div>
            <div className='flex gap-3 ms-auto'>
              <ReactionButton />
            </div>
          </div>
          <div className='py-4 '>
            {allComments.map((item, i) => (
              <TopicComment data={item} key={i} />
            ))}

            {/* <div className=' italic border rounded-md py-6 px-4'>
                            <p>Todavía nadie ha hecho un comentario, puedes ser el primero...</p>
                        </div> */}
          </div>
          <AddCommentForm loggedUser={loggedUser} topic={topic} />
        </div>
      </div>
    </div>
  );
};

export default Topic;
