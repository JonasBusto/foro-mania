import { createSlice } from '@reduxjs/toolkit';
import { topicExtraReducers } from './extraReducers';

const initialState = {
  topics: [],
  topic: null,
  status: 'Inactivo',
  statusTopic: 'Inactivo',
  statusCreate: 'Inactivo',
  statusDelete: 'Inactivo',
  statusUpdate: 'Inactivo',
  error: null,
};

export const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {},
  extraReducers: topicExtraReducers,
});

export default topicSlice.reducer;
