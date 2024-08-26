import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCommentAction } from '../../hooks/useCommentAction';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { useUserAction } from '../../hooks/useUserAction';
import { useCategoryAction } from '../../hooks/useCategoryAction';
import { useTagAction } from '../../hooks/useTagAction';

export const TopicListTopic = ({ topic, type = '' }) => {
  const { allComments, fetchComments } = useCommentAction();
  const { users } = useUserAction();
  const { tags } = useTagAction();
  const { categories } = useCategoryAction();
  const userFiltered = users.find((item) => item.uid === topic.userId);
  const categorieFiltered = categories
    .filter((category) => category.isActive === true)
    .find((item) => item.uid === topic.categoryId);

  useEffect(() => {
    fetchComments();
  }, []);

  const filteredComments = allComments.filter(
    (item) => item.topicId === topic.uid
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
        <div className='flex justify-center items-start py-3 px-2 bg-[#1f1f1f] hover:bg-[#252525] min-h-24 sm:h-24'>
          <Link
            to={`/users-view/${userFiltered.uid}`}
            className='flex items-center justify-center h-full w-12 my-auto'
          >
            <img
              className='w-10 h-10 rounded-full object-cover'
              src={userFiltered.photoProfile}
              alt={`Foto de ${userFiltered.fullName}`}
            />
          </Link>
          <Link
            to={`/topic/${topic.uid}`}
            className='flex ps-4 items-center h-full w-full'
          >
            <div className='flex flex-col flex-grow'>
              <h3
                className='m-0 leading-4 sm:leading-5 text-lg text-[3vw] md:text-[16.3px] text-white w-[95%] block xl:hidden'
                style={{ fontWeight: '500' }}
              >
                {topic.title.length > 70
                  ? topic.title.slice(0, 70) + '...'
                  : topic.title}
              </h3>
              <h3
                className='m-0 leading-4 sm:leading-5 text-lg text-[3vw] md:text-[16.3px] text-white w-[95%] hidden xl:block'
                style={{ fontWeight: '500' }}
              >
                {topic.title.length > 100
                  ? topic.title.slice(0, 100) + '...'
                  : topic.title}
              </h3>
              <div className='flex items-center mt-2'>
                <div
                  className='w-3 h-3 me-1'
                  style={{ backgroundColor: categorieFiltered.color }}
                ></div>
                <p className='text-[10px] uppercase font-bold text-gray-300'>
                  {categorieFiltered.title}
                </p>
              </div>
              {topic.tagsId && (
                <div className='mt-2 flex flex-wrap items-center'>
                  {tags
                    .filter((tag) => topic.tagsId.includes(tag.uid))
                    .slice(0, 5)
                    .map((tag) => (
                      <p
                        key={tag.uid}
                        className='me-1 text-[10.5px] text-gray-400'
                      >
                        {'#' + tag.label}
                      </p>
                    ))}
                </div>
              )}
            </div>
            <div className='flex flex-col text-right text-gray-300 w-30rem'>
              <p className='text-[10px] text-gray-300 font-semibold'>
                {filteredComments.length} respuestas
              </p>
              <p className='text-[10.5px] text-gray-400 font-semibold'>
                <span className='hidden lg:inline'>Actualizado hace </span>
                <span className='lg:hidden'>Hace </span>
                {TimeToNow(mostRecentComment.createdAt)}
              </p>
            </div>
          </Link>
        </div>
      ) : type === 'account' ? (
        <div className='flex flex-col md:flex-row text-center border-b border-neutral-500 pb-3 mb-3'>
          <Link to={`/topic/${topic.uid}`} className='md:w-9/12 text-start'>
            <h2 className='text-lg font-semibold mb-1 text-white'>
              {topic?.title}
            </h2>
            <div className='flex items-center mt-2'>
              <div
                className='w-3 h-3 me-1'
                style={{ backgroundColor: categorieFiltered.color }}
              ></div>
              <p className='text-[10px] uppercase font-bold text-gray-300'>
                {categorieFiltered.title}
              </p>
            </div>
          </Link>
          <div className='md:w-3/12 flex items-center md:relative mt-4 md:mt-0'>
            <Link
              to={'/users-view/' + topicUser?.uid + '/summary'}
              className='me-2 flex items-center md:absolute left-[0rem]'
              style={{
                zIndex: 10,
              }}
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
                className={`me-2 flex items-center md:absolute`}
                style={{
                  left: (index + 1) * 2 + 'rem',
                  zIndex: 10 - (index + 1),
                }}
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
        <div className='flex flex-col md:flex-row text-center border-b border-neutral-500 pb-3 mb-3 mt-5 sm:mt-0'>
          <Link
            to={`/topic/${topic.uid}`}
            className='w-full md:w-7/12 text-start'
          >
            <h2 className='text-[20px] sm:text-lg leading-5 font-semibold mb-0 sm:mb-1 pe-4'>
              {topic.title}
            </h2>
            <div className='flex items-center mt-1 mb-2 hidden-summary-list-user'>
              <div
                className='w-3 h-3 me-1'
                style={{ backgroundColor: categorieFiltered.color }}
              ></div>
              <p className='text-[10px] uppercase font-bold text-gray-300'>
                {categorieFiltered.title}
              </p>
            </div>
            <p className='leading-5 pe-7'>
              {stripHtmlTags(topic.content).length > 150 ? (
                <>
                  {stripHtmlTags(topic.content.slice(0, 150))}
                  <span className='text-neutral-500'>...Leer Mas</span>
                </>
              ) : (
                stripHtmlTags(topic.content)
              )}
            </p>
          </Link>
          <div className='mt-2 md:mt-0 md:w-5/12 flex justify-center'>
            <div className='w-4/12 md:w-6/12 flex justify-center md:justify-normal hidden-list-user'>
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
            <div className='w-8/12 md:w-6/12 flex mt-3 md:mt-0 leading-3'>
              <div className='w-1/2 flex flex-col items-center justify-end hidden-summary-list-user px-1'>
                <p>
                  {filteredComments.length > 9 ? '+9' : filteredComments.length}
                </p>
                <p className='md:hidden text-sm'>Usuarios</p>
              </div>
              <div className='w-1/2 flex items-center justify-end md:justify-center flex-col px-1'>
                <p>{filteredComments.length}</p>
                <p className='md:hidden text-sm'>Comentarios</p>
              </div>
              <div className='w-1/2 flex items-center justify-end md:justify-center flex-col px-1'>
                <p className='text-sm'>
                  {TimeToNow(mostRecentComment.createdAt)}
                </p>
                <p className='md:hidden text-sm'>Actualizado</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
