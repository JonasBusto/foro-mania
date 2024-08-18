import { createSlice } from '@reduxjs/toolkit';
import { tagExtraReducers } from './extraReducers';

const initialState = {
  tags: [],
  tag: null,
  status: 'Inactivo',
  statusTag: 'Inactivo',
  statusCreate: 'Inactivo',
  statusDelete: 'Inactivo',
  statusUpdate: 'Inactivo',
  error: null,
};

export const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {},
  extraReducers: tagExtraReducers,
});

export default tagSlice.reducer;
