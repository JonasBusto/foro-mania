import { createSlice } from '@reduxjs/toolkit';
import { reactionExtraReducers } from './extraReducers';

const initialState = {
  reactions: [],
  reaction: null,
  status: 'Inactivo',
  statusReaction: 'Inactivo',
  statusCreate: 'Inactivo',
  statusUpdate: 'Inactivo',
  statusDelete: 'Inactivo',
  error: null,
};

export const reactionSlice = createSlice({
  name: 'reaction',
  initialState,
  reducers: {},
  extraReducers: reactionExtraReducers,
});

export default reactionSlice.reducer;
