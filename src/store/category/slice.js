import { createSlice } from '@reduxjs/toolkit';
import { categoryExtraReducers } from './extraReducers';

const initialState = {
  categories: [],
  category: null,
  status: 'Inactivo',
  statusCategory: 'Inactivo',
  statusCreate: 'Inactivo',
  statusDelete: 'Inactivo',
  statusUpdate: 'Inactivo',
  statusActive: 'Inactivo',
  error: null,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    clearCategory(state) {
      state.category = null;
    },
  },
  extraReducers: categoryExtraReducers,
});

export default categorySlice.reducer;
export const { clearCategory } = categorySlice.actions;
