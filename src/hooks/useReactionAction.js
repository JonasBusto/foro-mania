import {
  createReaction,
  deleteReactionById,
  getReactionById,
  updateReactionById,
} from '../store/reaction/thunks';
import { useAppDispatch, useAppSelector } from './store';

export function useReactionAction() {
  const reaction = useAppSelector((state) => state.reaction.reaction);
  const reactions = useAppSelector((state) => state.reaction.reactions);
  const statusReactions = useAppSelector((state) => state.reaction.status);
  const statusCreateReaction = useAppSelector(
    (state) => state.reaction.statusCreate
  );
  const statusUpdateReaction = useAppSelector(
    (state) => state.reaction.statusUpdate
  );
  const statusDeleteReaction = useAppSelector(
    (state) => state.reaction.statusDelete
  );

  const dispatch = useAppDispatch();

  const getReaction = async ({ id }) => {
    await dispatch(getReactionById({ id }));
  };

  const addReaction = async (reaction, { handleChangeLoadingReaction }) => {
    handleChangeLoadingReaction(true);
    await dispatch(createReaction(reaction));
    handleChangeLoadingReaction(false);
  };

  const updateReaction = async (
    { id, reaction },
    { handleChangeLoadingReaction }
  ) => {
    handleChangeLoadingReaction(true);
    await dispatch(updateReactionById({ id, reaction }));
    handleChangeLoadingReaction(false);
  };

  const deleteReaction = async ({ id }, { handleChangeLoadingReaction }) => {
    handleChangeLoadingReaction(true);
    await dispatch(deleteReactionById({ id }));
    handleChangeLoadingReaction(false);
  };

  return {
    reaction,
    reactions,
    statusReactions,
    statusCreateReaction,
    statusUpdateReaction,
    statusDeleteReaction,
    getReaction,
    addReaction,
    updateReaction,
    deleteReaction,
  };
}
