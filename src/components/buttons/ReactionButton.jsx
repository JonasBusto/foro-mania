import { useState } from 'react';

export const ReactionButton = ({
  reactions,
  addReaction,
  updateReaction,
  deleteReaction,
  loggedUser,
  content,
  favorites,
  addFavorite,
  deleteFavorite,
}) => {
  const [isLoadingReaction, setIsLoadingReaction] = useState(false);

  const reactionLoggedUser = reactions.find(
    (reaction) => reaction.userId === loggedUser?.uid
  );
  const favoriteLoggedUser = favorites?.find(
    (favorite) => favorite.userId === loggedUser?.uid
  );

  const handleChangeLoadingReaction = (value) => {
    setIsLoadingReaction(value);
  };

  return (
    <div className='flex items-center space-x-4'>
      <div className='flex items-center space-x-2'>
        {isLoadingReaction && (
          <p className='text-gray-400'>
            <i
              className='pi pi-spin pi-spinner'
              style={{ fontSize: '1rem' }}
            ></i>
          </p>
        )}
        {loggedUser && favorites && (
          <div className='flex items-center space-x-2 me-2'>
            <i
              className={`pi cursor-pointer transform transition-transform duration-200 ${
                favoriteLoggedUser ? 'pi-bookmark-fill' : 'pi-bookmark'
              }`}
              style={{ fontSize: '1.7rem' }}
              onClick={
                favoriteLoggedUser
                  ? () =>
                      deleteFavorite(
                        { id: favoriteLoggedUser.uid },
                        { handleChangeLoadingReaction }
                      )
                  : () =>
                      addFavorite(
                        {
                          userId: loggedUser.uid,
                          contentId: content.uid,
                        },
                        {
                          handleChangeLoadingReaction,
                        }
                      )
              }
            ></i>
          </div>
        )}
        <p className='text-sm text-gray-200'>
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
                ? 'pi-thumbs-up-fill text-[#1b95d2]'
                : 'pi-thumbs-up text-gray-400'
            } cursor-pointer transform transition-transform duration-200 ${
              isLoadingReaction ? 'pointer-events-none' : ''
            }`}
          ></i>
        ) : (
          <p className='text-gray-400'>Like</p>
        )}
      </div>
      <div className='flex items-center space-x-2'>
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
                ? 'pi-thumbs-down-fill text-red-500'
                : 'pi-thumbs-down text-gray-400'
            } cursor-pointer transform transition-transform duration-200 ${
              isLoadingReaction ? 'pointer-events-none' : ''
            }`}
          ></i>
        ) : (
          <p className='text-gray-400'>Dislike</p>
        )}
        <p className='text-sm text-gray-200'>
          {reactions.filter((reaction) => reaction.type === 'unlike').length}
        </p>
      </div>
    </div>
  );
};
