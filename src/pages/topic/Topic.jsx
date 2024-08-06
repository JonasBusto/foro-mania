import React, { useEffect, useState } from 'react';
import TopicComment from './TopicComment';
import AddCommentForm from './AddComentForm';
import ReactionButton from '../../components/buttons/ReactionButton';
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

const Topic = () => {
  const { id } = useParams();
  const { getTopic, topic, deleteTopic, statusDeleteTopic, statusTopic } =
    useTopicAction();
  const { user, getUser, userStatus } = useUserAction();
  const { loggedUser } = useAuth();
  const { fetchComments, allComments, statusDeleteComment, deleteComment } =
    useCommentAction();
  const { reactions, addReaction, updateReaction, deleteReaction } =
    useReactionAction();
  const { getCategory, statusCategory, category } = useCategoryAction();

  const [showEditTopic, setShowEditTopic] = useState(false);
  const [visible, setVisible] = useState(false);

  const TimeToNow = (fecha) => {
    const fechaISO = parseISO(fecha);
    return formatDistanceToNow(fechaISO, { locale: es });
  };

  useEffect(() => {
    if (id) {
      getTopic(id);
    }

    fetchComments(id);
  }, [id]);

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
    return <h1 className='text-white'>Cargando...</h1>;
  }

  return (
    <div className=' text-white min-h-screen py-10 px-4'>
      <div className='max-w-4xl mx-auto'>
        <div className='bg-gray-800 rounded-lg overflow-hidden'>
          <img
            src='#'
            alt='img-adversiting'
            className='w-full h-32 object-cover'
          />
        </div>
        <div className='mt-6'>
          <div className='flex justify-between items-center border-b border-gray-700 pb-4'>
            <div>
              <h2 className='text-4xl font-bold'>{topic.title}</h2>
              <p className='text-gray-400'>{category.title}</p>
            </div>
            {showEditTopic && topic.userId === loggedUser.uid && (
              <div>
                <Link
                  className='text-white bg-[#1b95d2] hover:bg-[#157ab8] px-4 py-2 rounded me-10'
                  to={'/upload-topic/' + topic.uid}
                >
                  <i className='pi pi-pencil'></i>
                </Link>
                <button
                  className='text-white bg-[#db1818] hover:bg-[#db1818c4] px-4 py-2 rounded'
                  onClick={() => setVisible(true)}
                >
                  <i className='pi pi-trash'></i>
                </button>
                <Dialog
                  header='Eliminar publicación'
                  visible={visible}
                  style={{ width: '50vw' }}
                  onHide={() => {
                    if (!visible) return;
                    setVisible(false);
                  }}
                >
                  <p>Esta seguro que desea eliminar la publicación?</p>
                  <div className='flex justify-between mt-10'>
                    <button
                      disabled={statusDeleteTopic === 'Cargando'}
                      className='text-white bg-[#1b95d2] hover:bg-[#157ab8] px-4 py-2 rounded'
                      onClick={() => setVisible(false)}
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
              <img
                src={user.photoProfile}
                alt='Imagen de usuario'
                className='w-14 h-14 object-cover rounded-full border-2 border-gray-600'
              />
              <div>
                <h3 className='text-xl font-semibold'>{user.fullName}</h3>
                <p className='text-sm text-gray-400'>{user.email}</p>
              </div>
            </div>
            <p className='text-sm text-gray-400'>
              {TimeToNow(topic.createdAt)}
            </p>
          </div>
          <div className='mt-4'>
            <TextEditor value={topic.content} readOnly={true} />
          </div>
          <div className='mt-8 flex flex-col md:flex-row justify-between border border-gray-600 bg-gray-800 rounded-lg px-6 py-4'>
            <div className='flex space-x-8'>
              <div className='text-center'>
                <p className='text-lg'>{TimeToNow(topic.createdAt)}</p>
                <p className='text-sm'>creado</p>
              </div>
              <div className='text-center'>
                <p className='text-lg'>{allComments.length}</p>
                <p className='text-sm'>respuestas</p>
              </div>
            </div>
            <div className='flex space-x-4'>
              <ReactionButton
                reactions={reactions.filter(
                  (reaction) => reaction.contentId === topic.uid
                )}
                addReaction={addReaction}
                updateReaction={updateReaction}
                deleteReaction={deleteReaction}
                loggedUser={loggedUser}
                content={topic}
              />
            </div>
          </div>
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
            <AddCommentForm
              action='create'
              loggedUser={loggedUser}
              topic={topic}
            />
          ) : (
            <p className='mt-4 text-gray-400'>
              Debes autenticarte para comentar
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topic;
