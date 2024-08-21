import { useState } from 'react';
import { useModal } from '../../hooks/useModal';

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
  typeContent = 'comment',
}) => {
  const [isLoadingReaction, setIsLoadingReaction] = useState(false);
  const { switchModalLogin } = useModal();

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
        <div className='w-[2rem]'>
          {isLoadingReaction && (
            <p className='text-gray-400'>
              <i
                className='pi pi-spin pi-spinner'
                style={{ fontSize: '1rem' }}
              ></i>
            </p>
          )}
        </div>
        {loggedUser && favorites && (
          <div className='flex items-center space-x-2 me-2'>
            <i
              className={`me-2 pi cursor-pointer transform transition-transform duration-200 ${
                favoriteLoggedUser ? 'pi-bookmark-fill' : 'pi-bookmark'
              }`}
              style={{ fontSize: '1.6rem', fontWeight: 400 }}
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
        {typeContent === 'comment' && (
          <p className='text-sm text-gray-200'>
            {reactions.filter((reaction) => reaction.type === 'like').length}
          </p>
        )}
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
            style={
              typeContent === 'topic'
                ? { fontSize: '1.6rem', fontWeight: 400 }
                : {}
            }
          ></i>
        ) : (
          typeContent === 'comment' && (
            <p
              className='text-gray-400 hover:text-gray-300'
              onClick={switchModalLogin}
            >
              <i className='pi pi-thumbs-up cursor-pointer transform transition-transform duration-200'></i>
            </p>
          )
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
            style={
              typeContent === 'topic'
                ? { fontSize: '1.6rem', fontWeight: 400 }
                : {}
            }
          ></i>
        ) : (
          typeContent === 'comment' && (
            <p
              className='text-gray-400 hover:text-gray-300'
              onClick={switchModalLogin}
            >
              <i className='pi pi-thumbs-down cursor-pointer transform transition-transform duration-200'></i>
            </p>
          )
        )}
        {typeContent === 'comment' && (
          <p className='text-sm text-gray-200'>
            {reactions.filter((reaction) => reaction.type === 'unlike').length}
          </p>
        )}
      </div>
    </div>
  );
};
