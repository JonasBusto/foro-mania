import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCommentAction } from '../../hooks/useCommentAction';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { useUserAction } from '../../hooks/useUserAction';
import { useCategoryAction } from '../../hooks/useCategoryAction';

const TopicListTopic = ({ topic, type = '' }) => {
  const { allComments, fetchComments } = useCommentAction();
  const { users } = useUserAction();
  const { categories } = useCategoryAction();

  const userFiltered = users.find((item) => item.uid === topic.userId);
  const categorieFiltered = categories.find(
    (item) => item.uid === topic.categoryId
  );

  useEffect(() => {
    fetchComments();
  }, []);

  const filteredComments = allComments.filter(
    (item) => item.topicId === topic.id
  );

  const mostRecentComment = filteredComments.reduce((latest, comment) => {
    return new Date(comment.createdAt) > new Date(latest.createdAt)
      ? comment
      : latest;
  }, filteredComments[0] || { createdAt: topic.createdAt });

  const TimeToNow = (fecha) => {
    if (!fecha) return 'No comments';
    const fechaISO = parseISO(fecha);
    const distancia = formatDistanceToNow(fechaISO, { locale: es });
    if (distancia.includes('de')) return distancia.split(' de ')[1];
    return distancia;
  };

  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const topicUser = users.find((user) => user.uid === topic.userId);
  const commentsOfTopicUser = users
    .filter((user) =>
      filteredComments.some(
        (comment) =>
          comment.userId === user.uid && comment.userId !== topicUser.uid
      )
    )
    .slice(0, 3);

  return (
    <>
      {type === 'home' ? (
        <Link
          to={`/topic/${topic.id}`}
          className='flex items-start p-4 bg-[#1e1e1e] h-24 rounded-lg border-l-4'
          style={{ borderLeft: `10px solid ${categorieFiltered.color}` }}
        >
          <div className='flex items-center w-full'>
            <div className='flex flex-col flex-grow'>
              <p className='text-gray-400 text-[9px] leading-tight'>
                {`${userFiltered.fullName} (${userFiltered.email})`}
              </p>
              <h3 className='m-0 text-lg lg:text-xl font-semibold max-w-[13rem] lg:max-w-max text-white'>
                {topic.title}
              </h3>
              <div className='flex items-center mt-2 text-gray-400'>
                <p className='text-sm ml-2'>{topic.category}</p>
              </div>
            </div>
            <div className='flex flex-col text-right text-gray-300'>
              <p className='text-sm'>{filteredComments.length} respuestas</p>
              <p className='text-sm'>
                <span className='hidden lg:inline'>Actualizado hace </span>
                <span className='lg:hidden'>Hace </span>
                {TimeToNow(mostRecentComment.createdAt)}
              </p>
            </div>
          </div>
        </Link>
      ) : type === 'account' ? (
        <div className='flex flex-col md:flex-row text-center border-b border-neutral-500 pb-3 mb-3'>
          <Link to={`/topic/${topic.id}`} className='md:w-9/12 text-start'>
            <h2 className='text-lg font-semibold mb-1 text-white'>
              {topic.title}
            </h2>
            <h2 className='text-sm font-semibold text-gray-400 mb-1'>
              {categorieFiltered.title}
            </h2>
          </Link>
          <div className='md:w-3/12 flex items-center relative'>
            <Link
              to={'/users-view/' + topicUser?.uid + '/summary'}
              className='me-2 flex items-center absolute left-[0rem]'
            >
              <img
                className='w-10 h-10 object-cover rounded-full'
                src={topicUser?.photoProfile}
                alt={topicUser?.fullName}
              />
            </Link>
            {commentsOfTopicUser.map((user, index) => (
              <Link
                key={user.uid}
                to={'/users-view/' + user?.uid + '/summary'}
                className={`me-2 flex items-center absolute left-[${
                  (index + 1) * 2
                }rem]`}
              >
                <img
                  className='w-10 h-10 object-cover rounded-full'
                  src={user?.photoProfile}
                  alt={user?.fullName}
                />
              </Link>
            ))}
          </div>
          <div className='md:w-1/12 flex mt-3 md:mt-0 leading-3'></div>
        </div>
      ) : (
        <div className='flex flex-col md:flex-row text-center border-b border-neutral-500 pb-3 mb-3'>
          <Link to={`/topic/${topic.id}`} className='md:w-7/12 text-start'>
            <h2 className='text-lg font-semibold mb-1'>{topic.title}</h2>
            <p className='leading-5 pe-7'>
              {stripHtmlTags(topic.content.slice(0, 150))}{' '}
              <span className='text-neutral-500'>...Leer Mas</span>{' '}
            </p>
          </Link>
          <div className='md:w-3/12 flex'>
            <Link
              to={'/users-view/' + topicUser?.uid + '/summary'}
              className='me-2 flex items-center'
            >
              <img
                className='w-12 h-12 object-cover rounded-full'
                src={topicUser?.photoProfile}
                alt={topicUser?.fullName}
              />
            </Link>
            {commentsOfTopicUser.map((user) => (
              <Link
                key={user.uid}
                to={'/users-view/' + user?.uid + '/summary'}
                className='me-2 flex items-center'
              >
                <img
                  className='w-12 h-12 object-cover rounded-full'
                  src={user?.photoProfile}
                  alt={user?.fullName}
                />
              </Link>
            ))}
          </div>
          <div className='md:w-2/12 flex mt-3 md:mt-0 leading-3'>
            <div className='w-1/2 flex items-center justify-center flex-col'>
              <p>{filteredComments.length}</p>
              <p className='md:hidden text-sm'>Comentarios</p>
            </div>
            <div className='w-1/2 flex items-center justify-center flex-col'>
              <p className='text-sm'>
                {TimeToNow(mostRecentComment.createdAt)}
              </p>
              <p className='md:hidden text-sm'>Actualizado</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopicListTopic;
