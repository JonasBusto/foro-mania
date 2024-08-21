import { useEffect, useState } from 'react';
import { TopicComment } from './TopicComment';
import { UploadComentForm } from './UploadComentForm';
import { ReactionButton } from '../../components/buttons/ReactionButton';
import { Link, useParams } from 'react-router-dom';
import { useTopicAction } from '../../hooks/useTopicAction';
import { useAuth } from '../../hooks/useAuth';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { useUserAction } from '../../hooks/useUserAction';
import { useCommentAction } from '../../hooks/useCommentAction';
import { useReactionAction } from '../../hooks/useReactionAction';
import { useCategoryAction } from '../../hooks/useCategoryAction';
import { TextEditor } from '../../components/topic/TextEditor';
import { Dialog } from 'primereact/dialog';
import { useFavoriteAction } from '../../hooks/useFavoriteAction';
import { BannerAdversiting } from '../../components/items/BannerAdversiting';
import { Loader } from '../../components/items/Loader';
import useDocTitle from '../../hooks/useDocTitle';
import { useTagAction } from '../../hooks/useTagAction';
import { TopicTags } from '../../components/topic/TopicTags';
import {
  CountAllAnswers,
  CountDislikesOfTopic,
  CountFavoritesOfTopic,
  CountLikesOfTopic,
  CreatedBy,
  LastAnswer,
  UsersOfTopic,
} from '../../components/topic/TopicDetail';
import { useModal } from '../../hooks/useModal';

export const Topic = () => {
  const { id } = useParams();
  const {
    getTopic,
    topic,
    enableTopic,
    disableTopic,
    statusActiveTopic,
    statusTopic,
    deleteTopic,
    statusDeleteTopic,
  } = useTopicAction();
  const { tags } = useTagAction();
  const { user, users, getUser, userStatus } = useUserAction();
  const { loggedUser } = useAuth();
  const { fetchComments, allComments, statusDeleteComment, deleteComment } =
    useCommentAction();
  const { reactions, addReaction, updateReaction, deleteReaction } =
    useReactionAction();
  const { getCategory, statusCategory, category } = useCategoryAction();
  const { favorites, addFavorite, deleteFavorite } = useFavoriteAction();
  const { switchModalLogin, switchModalRegister } = useModal();

  const [showEditTopic, setShowEditTopic] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleDialogDelete, setVisibleDialogDelete] = useState(false);
  const [topicToModify, setTopicToModify] = useState(null);
  const [showDetailTopic, setShowDetailTopic] = useState(false);

  if (!topic) {
    useDocTitle('ForoManía | Tópicos');
  }

  if (topic) {
    useDocTitle(`ForoManía | ${topic.title}`);
  }

  const TimeToNow = (fecha) => {
    const fechaISO = parseISO(fecha);
    return formatDistanceToNow(fechaISO, { locale: es });
  };

  const handleConfirmEnable = async () => {
    if (topicToModify) {
      await enableTopic({ id: topic.uid });
      setVisible(false);
    }
  };

  const handleOpenDialog = (category) => {
    setTopicToModify(category);
    setVisible(true);
  };

  const handleConfirmDisable = () => {
    if (topicToModify) {
      disableTopic({ id: topic.uid });
      setVisible(false);
    }
  };

  useEffect(() => {
    if (id) {
      getTopic(id);
    }

    fetchComments(id);
  }, [id, statusActiveTopic]);

  useEffect(() => {
    if (topic) {
      getUser({ id: topic.userId });
      getCategory({ id: topic.categoryId });
    }
  }, [topic]);

  useEffect(() => {
    if (loggedUser) {
      setShowEditTopic(true);
    } else {
      setShowEditTopic(false);
    }
  }, [loggedUser]);

  if (
    statusTopic === 'Inactivo' ||
    statusTopic === 'Cargando' ||
    userStatus === 'Inactivo' ||
    userStatus === 'Cargando' ||
    statusCategory === 'Inactivo' ||
    statusCategory === 'Cargando' ||
    !topic ||
    !category
  ) {
    return <Loader />;
  }

  const lastCommentUser = users?.find(
    (user) => user.uid === allComments[0]?.userId
  );

  const commentsOfTopicUser = users.filter((user) =>
    allComments.some(
      (comment) =>
        comment.userId === user.uid && comment.userId !== topic.userId
    )
  );

  const reactionsOfTopic = reactions.filter(
    (reaction) => reaction.contentId === topic.uid
  );

  return (
    <div className=' text-white min-h-screen pb-10 pt-3 px-4'>
      <div className='max-w-[75rem] mx-auto'>
        <div className='bg-gray-800'>
          <BannerAdversiting />
        </div>
        <div className='mt-16'>
          <div className='flex flex-wrap justify-between items-center border-b border-gray-700'>
            <div>
              <h2 className='text-4xl font-bold'>{topic.title}</h2>
              <p className='text-gray-400 pb-4'>{category.title}</p>
            </div>
            {((showEditTopic && topic.userId === loggedUser?.uid) ||
              loggedUser?.role === 'admin') && (
              <div className='flex'>
                <button
                  className={`${
                    topic.isActive ? 'text-red-500' : 'text-green-500'
                  } hover:bg-neutral-800 duration-200 h-10 px-2 my-3 border border-gray-700`}
                  onClick={() => handleOpenDialog(category)}
                >
                  {topic.isActive ? (
                    <>
                      <i className='pi pi-pause'></i>
                      <span className='ml-2'>Suspender Publicacion</span>
                    </>
                  ) : (
                    <>
                      <i className='pi pi-play'></i>
                      <span className='ml-2'>Habilitar Publicacion</span>
                    </>
                  )}
                </button>
              </div>
            )}
            {showEditTopic && topic.userId === loggedUser?.uid && (
              <div className='flex items-center me-10'>
                <Link to={'/upload-topic/' + topic.uid}>
                  <div className='text-[#1b95d2] hover:bg-neutral-800 duration-200 h-10 w-10 rounded-sm flex items-center justify-center border border-gray-700'>
                    <i className='pi pi-pencil'></i>
                  </div>
                </Link>
                <button
                  className=' ms-4 text-[#db1818] hover:bg-neutral-800 duration-200 h-10 w-10 border border-gray-700'
                  onClick={() => setVisibleDialogDelete(true)}
                >
                  <i className='pi pi-trash'></i>
                </button>
                <Dialog
                  header='Eliminar publicación'
                  visible={visibleDialogDelete}
                  style={{ width: '50vw' }}
                  onHide={() => {
                    if (!visibleDialogDelete) return;
                    setVisibleDialogDelete(false);
                  }}
                >
                  <p>Esta seguro que desea eliminar la publicación?</p>
                  <div className='flex justify-between mt-10'>
                    <button
                      disabled={statusDeleteTopic === 'Cargando'}
                      className='text-white bg-[#1b95d2] hover:bg-[#157ab8] px-4 py-2 rounded'
                      onClick={() => setVisibleDialogDelete(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      disabled={statusDeleteTopic === 'Cargando'}
                      className='text-white bg-[#db1818] hover:bg-[#db1818c4] px-4 py-2 rounded'
                      onClick={() => deleteTopic({ id: topic.uid })}
                    >
                      {statusDeleteTopic === 'Cargando'
                        ? 'Cargando'
                        : 'Confirmar'}
                    </button>
                  </div>
                </Dialog>
              </div>
            )}
          </div>
          <div className='mt-4 flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <Link to={'/users-view/' + user?.uid + '/summary'}>
                <img
                  src={user.photoProfile}
                  alt='Imagen de usuario'
                  className='w-14 h-14 object-cover rounded-full border-2 border-gray-600'
                />
              </Link>
              <div className='flex flex-col'>
                <Link
                  to={'/users-view/' + user?.uid + '/summary'}
                  className='text-xl font-semibold'
                >
                  {user.fullName}
                </Link>
                <Link
                  to={'/users-view/' + user?.uid + '/summary'}
                  className='text-sm text-gray-400'
                >
                  {user.email}
                </Link>
              </div>
            </div>
            <p className='text-sm text-gray-400'>
              Hace {TimeToNow(topic.createdAt)}
            </p>
          </div>
          {topic.tagsId && (
            <div className='mt-5'>
              <TopicTags
                tags={tags.filter((tag) => topic.tagsId.includes(tag.uid))}
              />
            </div>
          )}
          <div className='mt-4'>
            <TextEditor value={topic.content} readOnly={true} />
          </div>
          <div className='mt-8 flex flex-wrap justify-between border border-gray-600 bg-[#202020]'>
            <div className='flex gap-4 px-2 md:px-4 py-2 md:py-3'>
              <CreatedBy user={user} topic={topic} />
              {lastCommentUser && (
                <LastAnswer
                  lastCommentUser={lastCommentUser}
                  lastComment={allComments[0]}
                  query='hidden sm:flex'
                />
              )}
              <CountAllAnswers
                allComments={allComments}
                query='hidden md:flex'
              />
              <CountFavoritesOfTopic
                favorites={favorites}
                topic={topic}
                query='hidden lg:flex'
              />
              {!loggedUser && !showDetailTopic && (
                <CountLikesOfTopic
                  content={reactionsOfTopic}
                  query='mb-2 sm:mb-0'
                />
              )}
            </div>
            <div className='flex space-x-4 ms-auto'>
              <ReactionButton
                reactions={reactions.filter(
                  (reaction) => reaction.contentId === topic.uid
                )}
                addReaction={addReaction}
                updateReaction={updateReaction}
                deleteReaction={deleteReaction}
                loggedUser={loggedUser}
                content={topic}
                favorites={favorites.filter(
                  (favorite) => favorite.contentId === topic.uid
                )}
                addFavorite={addFavorite}
                deleteFavorite={deleteFavorite}
                typeContent='topic'
              />
            </div>
            <div className='ms-4 cursor-pointer border-l-2 border-gray-600 flex justify-center items-center'>
              <button
                onClick={() => setShowDetailTopic(!showDetailTopic)}
                className='px-6 h-full hover:bg-[#2b2b2b]'
              >
                <i
                  className={`pi ${
                    showDetailTopic ? 'pi-angle-up' : 'pi-angle-down'
                  } text-[32px]`}
                ></i>
              </button>
            </div>
          </div>
          {showDetailTopic && (
            <>
              <div className='flex flex-col md:flex-row justify-between border border-t-0 border-gray-600 bg-[#202020]'>
                <UsersOfTopic
                  user={user}
                  commentsOfTopicUser={commentsOfTopicUser}
                />
              </div>
              <div className='flex flex-col md:flex-row justify-between border border-t-0 border-gray-600 bg-[#202020]'>
                <div className='px-2 md:px-4 py-2 md:py-3 flex justify-center sm:justify-start flex-wrap'>
                  <CountAllAnswers
                    allComments={allComments}
                    query='mb-2 sm:mb-0 md:hidden'
                  />
                  <CountFavoritesOfTopic
                    favorites={favorites}
                    topic={topic}
                    query='mb-2 sm:mb-0 lg:hidden'
                  />
                  {(loggedUser || showDetailTopic) && (
                    <CountLikesOfTopic
                      content={reactionsOfTopic}
                      query='mb-2 sm:mb-0'
                    />
                  )}
                  <CountDislikesOfTopic content={reactionsOfTopic} />
                  {lastCommentUser && (
                    <LastAnswer
                      lastCommentUser={lastCommentUser}
                      lastComment={allComments[0]}
                      query='mb-2 sm:mb-0 sm:hidden flex'
                    />
                  )}
                </div>
              </div>
            </>
          )}
          <div className='mt-6'>
            <h4 className='text-[2rem] font-bold mt-10'>Comentarios: </h4>
            {allComments.length > 0 ? (
              allComments.map((item, i) => (
                <TopicComment
                  data={item}
                  reactions={reactions.filter(
                    (reaction) => reaction.contentId === item.uid
                  )}
                  addReaction={addReaction}
                  updateReaction={updateReaction}
                  deleteReaction={deleteReaction}
                  statusDeleteComment={statusDeleteComment}
                  deleteComment={deleteComment}
                  loggedUser={loggedUser}
                  key={i}
                />
              ))
            ) : (
              <div className='italic border rounded-md py-6 px-4 text-center'>
                <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
              </div>
            )}
          </div>
          {loggedUser ? (
            <UploadComentForm
              action='create'
              loggedUser={loggedUser}
              topic={topic}
            />
          ) : (
            <div className='border border-neutral-400 p-6 rounded-md my-4'>
              <p className='text-center text-neutral-400'>
                Para comentar, por favor{' '}
                <button
                  className='text-neutral-200 underline'
                  onClick={switchModalLogin}
                >
                  inicia sesión
                </button>
                . Si no tienes una cuenta, puedes registrarte{' '}
                <button
                  className='text-neutral-200 underline'
                  onClick={switchModalRegister}
                >
                  aquí
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
      <Dialog
        header={
          topic?.isActive ? 'Suspender Publicacion ' : 'Habilitar Publicacion'
        }
        visible={visible}
        style={{ width: '50vw' }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <p>
          Esta seguro que desea {topic?.isActive ? 'suspender ' : 'habilitar '}{' '}
          la publicación?
        </p>
        <div className='flex justify-between mt-10'>
          <button
            disabled={statusActiveTopic === 'Cargando'}
            className='text-white bg-[#1b95d2] hover:bg-[#157ab8] px-4 py-2 rounded'
            onClick={() => setVisible(false)}
          >
            Cancelar
          </button>
          <button
            disabled={statusActiveTopic === 'Cargando'}
            className={`text-white bg-[#db1818] hover:bg-[#db1818c4] px-4 py-2 rounded`}
            onClick={
              topic?.isActive ? handleConfirmDisable : handleConfirmEnable
            }
          >
            {statusActiveTopic === 'Cargando'
              ? 'Cargando'
              : topic?.isActive
              ? 'Suspendar'
              : 'Habilitar'}
          </button>
        </div>
      </Dialog>
    </div>
  );
};
