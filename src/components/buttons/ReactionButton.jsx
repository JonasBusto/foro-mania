import React, { useState } from 'react';

const ReactionButton = ({
  reactions,
  addReaction,
  updateReaction,
  deleteReaction,
  loggedUser,
  content,
}) => {
  let [isLoadingReaction, setIsLoadingReaction] = useState(false);

  let reactionLoggedUser = reactions.find(
    (reaction) => reaction.userId === loggedUser?.uid
  );

  const handleChangeLoadingReaction = (value) => {
    setIsLoadingReaction(value);
  };

  return (
    <div className='flex items-center gap-3'>
      <div className='flex items-center gap-2'>
        {isLoadingReaction && <p>Cargando</p>}
        <p className='text-sm'>
          {reactions.filter((reaction) => reaction.type === 'like').length}
        </p>
        {loggedUser ? (
          <i
            onClick={
              reactionLoggedUser && reactionLoggedUser.userId === loggedUser.uid
                ? reactionLoggedUser.type === 'like'
                  ? () =>
                      deleteReaction(
                        { id: reactionLoggedUser.uid },
                        { handleChangeLoadingReaction }
                      )
                  : () =>
                      updateReaction(
                        {
                          reaction: {
                            type: 'like',
                          },
                          id: reactionLoggedUser.uid,
                        },
                        { handleChangeLoadingReaction }
                      )
                : () =>
                    addReaction(
                      {
                        userId: loggedUser.uid,
                        type: 'like',
                        contentId: content.uid,
                      },
                      {
                        handleChangeLoadingReaction,
                      }
                    )
            }
            className={`pi ${
              reactionLoggedUser &&
              reactionLoggedUser.type === 'like' &&
              reactionLoggedUser.userId === loggedUser.uid
                ? 'pi-thumbs-up-fill'
                : 'pi-thumbs-up'
            } cursor-pointer active:scale-125 duration-200 ${
              isLoadingReaction ? 'pointer-events-none' : ''
            }`}
          ></i>
        ) : (
          <p>like</p>
        )}
      </div>
      <div className='flex items-center gap-2'>
        {loggedUser ? (
          <i
            onClick={
              reactionLoggedUser && reactionLoggedUser.userId === loggedUser.uid
                ? reactionLoggedUser.type === 'unlike'
                  ? () =>
                      deleteReaction(
                        { id: reactionLoggedUser.uid },
                        { handleChangeLoadingReaction }
                      )
                  : () =>
                      updateReaction(
                        {
                          reaction: {
                            type: 'unlike',
                          },
                          id: reactionLoggedUser.uid,
                        },
                        { handleChangeLoadingReaction }
                      )
                : () =>
                    addReaction(
                      {
                        userId: loggedUser.uid,
                        type: 'unlike',
                        contentId: content.uid,
                      },
                      { handleChangeLoadingReaction }
                    )
            }
            className={`pi ${
              reactionLoggedUser &&
              reactionLoggedUser.type === 'unlike' &&
              reactionLoggedUser.userId === loggedUser.uid
                ? 'pi-thumbs-down-fill'
                : 'pi-thumbs-down'
            } cursor-pointer active:scale-125 duration-200 ${
              isLoadingReaction ? 'pointer-events-none' : ''
            }`}
          ></i>
        ) : (
          <p>unlike</p>
        )}
        <p className='text-sm'>
          {reactions.filter((reaction) => reaction.type === 'unlike').length}
        </p>
      </div>
    </div>
  );
};

export default ReactionButton;
