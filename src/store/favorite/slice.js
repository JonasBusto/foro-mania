import { createSlice } from '@reduxjs/toolkit';
import { favoritesExtraReducers } from './extraReducers';

const initialState = {
  favorites: [],
  favorite: null,
  status: 'Inactivo',
  statusFavorite: 'Inactivo',
  statusCreate: 'Inactivo',
  statusUpdate: 'Inactivo',
  statusDelete: 'Inactivo',
  error: null,
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {},
  extraReducers: favoritesExtraReducers,
});

export default favoriteSlice.reducer;
