import {
  createFavorite,
  deleteFavoriteById,
  getFavoriteById,
  getFavorites,
} from './thunks';

export const favoritesExtraReducers = (builder) => {
  builder
    .addCase(getFavorites.pending, (state) => {
      state.status = 'Cargando';
    })
    .addCase(getFavorites.fulfilled, (state, action) => {
      state.status = 'Exitoso';
      state.favorites = action.payload;
    })
    .addCase(getFavorites.rejected, (state, action) => {
      state.status = 'Fallido';
      state.error = action.payload;
    });

  builder
    .addCase(getFavoriteById.pending, (state) => {
      state.statusFavorite = 'Cargando';
    })
    .addCase(getFavoriteById.fulfilled, (state, action) => {
      state.statusFavorite = 'Exitoso';
      state.favorite = action.payload;
    })
    .addCase(getFavoriteById.rejected, (state, action) => {
      state.statusFavorite = 'Fallido';
      state.error = action.payload;
    });

  builder
    .addCase(createFavorite.pending, (state) => {
      state.statusCreate = 'Cargando';
    })
    .addCase(createFavorite.fulfilled, (state, action) => {
      state.statusCreate = 'Exitoso';
      state.favorites = [...state.favorites, action.payload];
    })
    .addCase(createFavorite.rejected, (state, action) => {
      state.statusCreate = 'Fallido';
      state.error = action.payload;
    });

  builder
    .addCase(deleteFavoriteById.pending, (state) => {
      state.statusDelete = 'Cargando';
    })
    .addCase(deleteFavoriteById.fulfilled, (state, action) => {
      state.statusDelete = 'Exitoso';
      state.favorites = state.favorites.filter(
        (favorite) => favorite.uid !== action.payload
      );
    })
    .addCase(deleteFavoriteById.rejected, (state, action) => {
      state.statusDelete = 'Fallido';
      state.error = action.payload;
    });
};
