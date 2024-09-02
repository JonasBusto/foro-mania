import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    unreadMessagesCount: 0,
  },
  reducers: {
    setUnreadMessagesCount(state, action) {
      state.unreadMessagesCount = action.payload;
    },
    clearUnreadMessagesCount(state) {
      state.unreadMessagesCount = 0;
    },
  },
});

export const { setUnreadMessagesCount, clearUnreadMessagesCount } =
  chatSlice.actions;
export default chatSlice.reducer;
