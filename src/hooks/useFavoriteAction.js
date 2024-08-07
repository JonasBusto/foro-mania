import {
  createFavorite,
  deleteFavoriteById,
  getFavoriteById,
  getFavorites,
} from '../store/favorite/thunks';
import { useAppDisptach, useAppSelector } from './store';

export function useFavoriteAction() {
  const favorite = useAppSelector((state) => state.favorite.favorite);
  const favorites = useAppSelector((state) => state.favorite.favorites);
  const statusFavorites = useAppSelector((state) => state.favorite.status);
  const statusCreateFavorite = useAppSelector(
    (state) => state.favorite.statusCreate
  );
  const statusUpdateFavorite = useAppSelector(
    (state) => state.favorite.statusUpdate
  );
  const statusDeleteFavorite = useAppSelector(
    (state) => state.favorite.statusDelete
  );

  const dispatch = useAppDisptach();

  const getFavorite = async ({ id }) => {
    await dispatch(getFavoriteById({ id }));
  };

  const addFavorite = async (favorite, { handleChangeLoadingReaction }) => {
    handleChangeLoadingReaction(true);
    await dispatch(createFavorite(favorite));
    handleChangeLoadingReaction(false);
  };

  const deleteFavorite = async ({ id }, { handleChangeLoadingReaction }) => {
    handleChangeLoadingReaction(true);
    await dispatch(deleteFavoriteById({ id }));
    handleChangeLoadingReaction(false);
  };

  return {
    favorite,
    favorites,
    statusFavorites,
    statusCreateFavorite,
    statusUpdateFavorite,
    statusDeleteFavorite,
    getFavorite,
    addFavorite,
    deleteFavorite,
  };
}
