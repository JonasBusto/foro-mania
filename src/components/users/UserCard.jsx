import React from 'react';
import { useNavigate } from 'react-router-dom';
import { lastTopicExtract, TimeToNow } from '../../helpers/Actions';
import '../../styles/userCard.css';

export const UserCard = ({ currentUser, topics }) => {
  const { photoProfile, email, uid, fullName } = currentUser;
  const username = fullName.split(' ')[0].toLowerCase();

  const navigate = useNavigate();

  const navigateToUserSummary = (id) => {
    navigate(`/users-view/${id}/summary`);
  };
  const navigateToTopic = (id) => {
    navigate(`/topic/${id}`);
  };

  const lastTopic = lastTopicExtract(uid, topics);

  const topicDate = TimeToNow(lastTopic.createdAt);

  return (
    <div className='userCardContainer'>
      <div className='brandContainer'>
        <figure>
          <img
            src={photoProfile}
            onClick={() => navigateToUserSummary(uid)}
            alt='foto de perfil del usuario'
            className='rounded-full cursor-pointer object-cover'
          />
        </figure>

        <section className='personal-name'>
          <h2 onClick={() => navigateToUserSummary(uid)}>@{username}</h2>
          <span className='text-white'>{email}</span>
        </section>
      </div>

      <div className='userInfo'>
        {lastTopic ? (
          <>
            <span>
              Ultimo tópico creado:{' '}
              <strong
                className='cursor-pointer'
                onClick={() => navigateToTopic(lastTopic.uid)}
              >
                {lastTopic.title}
              </strong>
            </span>
            <small>Hace {topicDate}</small>
          </>
        ) : (
          <span>Todavía no ha creado ningún tópico</span>
        )}
      </div>
    </div>
  );
};
