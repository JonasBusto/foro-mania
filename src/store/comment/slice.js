import { createSlice } from '@reduxjs/toolkit';
import { commentExtraReducers } from './extraReducers';

const initialState = {
  comments: [],
  comment: null,
  status: 'Inactivo',
  statusComment: 'Inactivo',
  statusCreate: 'Inactivo',
  statusDelete: 'Inactivo',
  statusUpdate: 'Inactivo',
  error: null,
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: commentExtraReducers,
});

export default commentSlice.reducer;
