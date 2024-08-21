import { useState } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { ReactionButton } from '../../components/buttons/ReactionButton';
import { useUserAction } from '../../hooks/useUserAction';
import { TextEditor } from '../../components/topic/TextEditor';
import { Dialog } from 'primereact/dialog';
import { UploadComentForm } from './UploadComentForm';
import { Link } from 'react-router-dom';
import { useCommentAction } from '../../hooks/useCommentAction';

export const TopicComment = ({
  data,
  reactions,
  addReaction,
  updateReaction,
  deleteReaction,
  loggedUser,
  statusDeleteComment,
}) => {
  const { users } = useUserAction();
  const { enableComment, disableComment, statusActiveComment, deleteComment } =
    useCommentAction();
  const [visible, setVisible] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const TimeToNow = (fecha) => {
    const fechaISO = parseISO(fecha);
    return formatDistanceToNow(fechaISO, { locale: es });
  };
  const [dataToModify, setTopicToModify] = useState(null);
  const showSuspendedMessage = !data.isActive && loggedUser?.role === 'user';
  const userFiltered = users.find((item) => item.uid === data.userId);

  const handleConfirmEnable = async () => {
    if (dataToModify) {
      await enableComment({ id: data.uid });
      setVisibleDelete(false);
    }
  };

  const handleOpenDialog = (category) => {
    setTopicToModify(category);
    setVisibleDelete(true);
  };

  const handleConfirmDisable = () => {
    if (dataToModify) {
      disableComment({ id: data.uid });
      setVisibleDelete(false);
    }
  };

  return (
    <div className='relative'>
      <div className='py-3 flex flex-wrap justify-between'>
        <div className='flex gap-4'>
          <Link to={'/users-view/' + userFiltered?.uid + '/summary'}>
            <img
              src={userFiltered.photoProfile}
              alt='Imagen de usuario'
              className='w-12 h-12 object-cover rounded-full'
            />
          </Link>
          <div className='flex'>
            <div className='flex flex-col'>
              <Link
                to={'/users-view/' + userFiltered?.uid + '/summary'}
                className='font-semibold text-lg'
              >
                {userFiltered.fullName}
              </Link>
              <Link
                to={'/users-view/' + userFiltered?.uid + '/summary'}
                className='text-sm text-gray-400'
              >
                {userFiltered.email}
              </Link>
            </div>
          </div>
        </div>
        <div>
          <p className='text-gray-300 text-sm'>
            Hace {TimeToNow(data.createdAt)}
          </p>
        </div>
      </div>
      {showSuspendedMessage ? (
        <div className='italic text-red-500 border rounded-md py-2 px-4 text-center mt-2'>
          <p>Este comentario fue suspendido por violar las reglas del foro.</p>
        </div>
      ) : (
        <>
          <div className='leading-loose'>
            {visible ? (
              <UploadComentForm
                action='update'
                loggedUser={loggedUser}
                data={data}
                setVisible={setVisible}
              />
            ) : (
              <TextEditor value={data.content} readOnly={true} />
            )}
          </div>
          <div className='flex flex-col md:flex-row justify-between border-b border-neutral-600 px-4 py-2 md:items-center my-8'>
            <div className='flex gap-5'>
              {data.userId === loggedUser?.uid ? (
                <>
                  {visible ? (
                    <button
                      className='text-red-400'
                      onClick={() => setVisible(false)}
                    >
                      Cancelar
                    </button>
                  ) : (
                    <button onClick={() => setVisible(true)}>
                      <i className='pi pi-pencil text-blue-400'></i>
                    </button>
                  )}
                  <button
                    className={`text-red-400 ${visible ? 'hidden' : ''}`}
                    onClick={() => setVisibleDelete(true)}
                  >
                    <i className='pi pi-trash'></i>
                  </button>
                </>
              ) : (
                loggedUser?.role === 'admin' && (
                  <button
                    type='button'
                    onClick={() => handleOpenDialog(data)}
                    className={`${
                      data.isActive ? 'text-red-500' : 'text-green-500'
                    } hover:bg-neutral-800 duration-200 px-2 h-10 border border-gray-700 flex items-center justify-center`}
                  >
                    {data.isActive ? (
                      <>
                        <i className='pi pi-pause'></i>
                        <span className='ml-2'>Suspender Comentario</span>
                      </>
                    ) : (
                      <>
                        <i className='pi pi-play'></i>
                        <span className='ml-2'>Habilitar Comentario</span>
                      </>
                    )}
                  </button>
                )
              )}
            </div>
            <div className='ms-auto border-s border-neutral-500 ps-3'>
              <ReactionButton
                reactions={reactions}
                addReaction={addReaction}
                updateReaction={updateReaction}
                deleteReaction={deleteReaction}
                loggedUser={loggedUser}
                content={data}
                typeContent='comment'
              />
            </div>
          </div>
        </>
      )}
      <Dialog
        header={
          loggedUser?.role === 'admin'
            ? data?.isActive
              ? 'Suspender Comentario'
              : 'Habilitar Comentario'
            : 'Eliminar Comentario'
        }
        visible={visibleDelete}
        style={{ width: '50vw' }}
        onHide={() => {
          if (!visibleDelete) return;
          setVisibleDelete(false);
        }}
      >
        <p>
          {loggedUser?.role === 'admin'
            ? `¿Está seguro que desea ${
                data?.isActive ? 'suspender' : 'habilitar'
              } el comentario?`
            : '¿Está seguro que desea eliminar el comentario?'}
        </p>
        <div className='flex justify-between mt-10'>
          <button
            disabled={
              statusDeleteComment === 'Cargando' ||
              statusActiveComment === 'Cargando'
            }
            className='text-white bg-[#1b95d2] hover:bg-[#157ab8] px-4 py-2 rounded'
            onClick={() => setVisibleDelete(false)}
          >
            Cancelar
          </button>
          {loggedUser?.role === 'admin' ? (
            <button
              disabled={statusActiveComment === 'Cargando'}
              className='text-white bg-[#db1818] hover:bg-[#db1818c4] px-4 py-2 rounded'
              onClick={
                data?.isActive ? handleConfirmDisable : handleConfirmEnable
              }
            >
              {statusActiveComment === 'Cargando'
                ? 'Cargando'
                : data?.isActive
                ? 'Suspender'
                : 'Habilitar'}
            </button>
          ) : (
            <button
              disabled={statusDeleteComment === 'Cargando'}
              className='text-white bg-[#db1818] hover:bg-[#db1818c4] px-4 py-2 rounded'
              onClick={() =>
                deleteComment({ id: data.uid }, { setVisibleDelete })
              }
            >
              {statusDeleteComment === 'Cargando' ? 'Cargando' : 'Confirmar'}
            </button>
          )}
        </div>
      </Dialog>
    </div>
  );
};
