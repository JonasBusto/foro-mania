import React, { useEffect, useState } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import ReactionButton from '../../components/buttons/ReactionButton';
import { useUserAction } from '../../hooks/useUserAction';

const TopicComment = ({
  data,
  reactions,
  addReaction,
  updateReaction,
  deleteReaction,
  loggedUser,
}) => {
  const { users } = useUserAction();

  const TimeToNow = (fecha) => {
    const fechaISO = parseISO(fecha);
    return formatDistanceToNow(fechaISO, { locale: es });
  };

  const userFiltered = users.find((item) => item.uid === data.userId);

  return (
    <div className='relative'>
      <div className='py-3 flex justify-between'>
        <div className='flex gap-4'>
          <img
            src={userFiltered.photoProfile}
            alt='Imagen de usuario'
            className='w-12 h-12 object-cover rounded-full'
          />
          <div>
            <h3 className='font-semibold text-lg'>{userFiltered.fullName}</h3>
            <p>{userFiltered.email}</p>
          </div>
        </div>
        <div>
          <p>{TimeToNow(data.createdAt)}</p>
        </div>
      </div>
      <div className='leading-loose'>
        <p>{data.content}</p>
      </div>
      <div className='flex flex-col md:flex-row justify-between border-b border-neutral-600 px-4 py-2 md:items-center my-8'>
        <div className='ms-auto border-s border-neutral-500 ps-3'>
          <ReactionButton
            reactions={reactions}
            addReaction={addReaction}
            updateReaction={updateReaction}
            deleteReaction={deleteReaction}
            loggedUser={loggedUser}
            content={data}
          />
        </div>
      </div>
    </div>
  );
};

export default TopicComment;
