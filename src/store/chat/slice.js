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
	},
});

export const { setUnreadMessagesCount } = chatSlice.actions;
export default chatSlice.reducer;
