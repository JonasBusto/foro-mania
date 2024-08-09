import { createSlice } from '@reduxjs/toolkit';
import { chatExtraReducers } from './extraReducers';

const initialState = {
  chats: [],
  chat: null,
  status: 'Inactivo',
  statusChat: 'Inactivo',
  error: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    clearChat(state) {
      state.chat = null;
    },
  },
  extraReducers: chatExtraReducers,
});

export default chatSlice.reducer;
export const { clearChat } = chatSlice.actions;
