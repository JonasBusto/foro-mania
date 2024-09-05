import { useState } from 'react';
import { useModal } from '../../hooks/useModal';
import { USER_REACTION } from '../../helpers/constants';

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
            {
              reactions.filter(
                (reaction) => reaction.type === USER_REACTION.LIKE
              ).length
            }
          </p>
        )}
        {loggedUser ? (
          <i
            onClick={
              reactionLoggedUser && reactionLoggedUser.userId === loggedUser.uid
                ? reactionLoggedUser.type === USER_REACTION.LIKE
                  ? () =>
                      deleteReaction(
                        { id: reactionLoggedUser.uid },
                        { handleChangeLoadingReaction }
                      )
                  : () =>
                      updateReaction(
                        {
                          reaction: {
                            type: USER_REACTION.LIKE,
                          },
                          id: reactionLoggedUser.uid,
                        },
                        { handleChangeLoadingReaction }
                      )
                : () =>
                    addReaction(
                      {
                        userId: loggedUser.uid,
                        type: USER_REACTION.LIKE,
                        contentId: content.uid,
                      },
                      {
                        handleChangeLoadingReaction,
                      }
                    )
            }
            className={`pi ${
              reactionLoggedUser &&
              reactionLoggedUser.type === USER_REACTION.LIKE &&
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
                ? reactionLoggedUser.type === USER_REACTION.DISLIKE
                  ? () =>
                      deleteReaction(
                        { id: reactionLoggedUser.uid },
                        { handleChangeLoadingReaction }
                      )
                  : () =>
                      updateReaction(
                        {
                          reaction: {
                            type: USER_REACTION.DISLIKE,
                          },
                          id: reactionLoggedUser.uid,
                        },
                        { handleChangeLoadingReaction }
                      )
                : () =>
                    addReaction(
                      {
                        userId: loggedUser.uid,
                        type: USER_REACTION.DISLIKE,
                        contentId: content.uid,
                      },
                      { handleChangeLoadingReaction }
                    )
            }
            className={`pi ${
              reactionLoggedUser &&
              reactionLoggedUser.type === USER_REACTION.DISLIKE &&
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
            {
              reactions.filter(
                (reaction) => reaction.type === USER_REACTION.DISLIKE
              ).length
            }
          </p>
        )}
      </div>
    </div>
  );
};
