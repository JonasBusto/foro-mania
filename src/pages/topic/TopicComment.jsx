import React, { useState } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import ReactionButton from '../../components/buttons/ReactionButton';
import { useUserAction } from '../../hooks/useUserAction';
import { TextEditor } from '../../components/topic/TextEditor';
import { Dialog } from 'primereact/dialog';
import AddCommentForm from './AddComentForm';

const TopicComment = ({
  data,
  reactions,
  addReaction,
  updateReaction,
  deleteReaction,
  loggedUser,
  deleteComment,
  statusDeleteComment,
}) => {
  const { users } = useUserAction();
  const [visible, setVisible] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);

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
          <div className='flex'>
            <div>
              <h3 className='font-semibold text-lg'>{userFiltered.fullName}</h3>
              <p>{userFiltered.email}</p>
            </div>
            {data.userId === loggedUser.uid ||
              (loggedUser.role === 'admin' && (
                <div className='flex'>
                  <div>
                    {visible ? (
                      <button onClick={() => setVisible(false)}>
                        cancelar
                      </button>
                    ) : (
                      <button className='mx-5' onClick={() => setVisible(true)}>
                        <i className='pi pi-pencil'></i>
                      </button>
                    )}
                  </div>
                  <div>
                    <button
                      className='mx-5'
                      onClick={() => setVisibleDelete(true)}
                    >
                      <i className='pi pi-trash'></i>
                    </button>
                    <Dialog
                      header='Eliminar comentario'
                      visible={visibleDelete}
                      style={{ width: '50vw' }}
                      onHide={() => {
                        if (!visibleDelete) return;
                        setVisible(false);
                      }}
                    >
                      <p>Esta seguro que desea eliminar el comentario?</p>
                      <div className='flex justify-between mt-10'>
                        <button
                          disabled={statusDeleteComment === 'Cargando'}
                          className='text-white bg-[#1b95d2] hover:bg-[#157ab8] px-4 py-2 rounded'
                          onClick={() => setVisibleDelete(false)}
                        >
                          Cancelar
                        </button>
                        <button
                          disabled={statusDeleteComment === 'Cargando'}
                          className='text-white bg-[#db1818] hover:bg-[#db1818c4] px-4 py-2 rounded'
                          onClick={() =>
                            deleteComment(
                              { id: data.uid },
                              { setVisibleDelete }
                            )
                          }
                        >
                          {statusDeleteComment === 'Cargando'
                            ? 'Cargando'
                            : 'Confirmar'}
                        </button>
                      </div>
                    </Dialog>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div>
          <p>{TimeToNow(data.createdAt)}</p>
        </div>
      </div>
      <div className='leading-loose'>
        {visible ? (
          <AddCommentForm
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
