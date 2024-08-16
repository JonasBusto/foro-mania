import {
	findOrCreateChatById,
	sendMessage,
	clearChatMessagesById,
	checkUnreadMessages,
	markMessagesAsRead,
} from './thunks';

export const chatExtraReducers = (builder) => {
	builder
		.addCase(findOrCreateChatById.pending, (state) => {
			state.statusChat = 'Cargando';
		})
		.addCase(findOrCreateChatById.fulfilled, (state, action) => {
			console.log(action.payload);
			state.statusChat = 'Exitoso';
			state.chat = action.payload;
		})
		.addCase(findOrCreateChatById.rejected, (state, action) => {
			state.statusChat = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(sendMessage.pending, (state) => {
			state.statusMsg = 'Cargando';
		})
		.addCase(sendMessage.fulfilled, (state, action) => {
			state.statusMsg = 'Exitoso';
			state.chats = action.payload;
		})
		.addCase(sendMessage.rejected, (state, action) => {
			state.statusMsg = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(clearChatMessagesById.pending, (state) => {
			state.statusChat = 'Cargando';
		})
		.addCase(clearChatMessagesById.fulfilled, (state, action) => {
			state.statusChat = 'Exitoso';
			state.chat = action.payload;
		})
		.addCase(clearChatMessagesById.rejected, (state, action) => {
			state.statusChat = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(checkUnreadMessages.pending, (state) => {
			state.statusChat = 'Cargando';
		})
		.addCase(checkUnreadMessages.fulfilled, (state, action) => {
			state.statusChat = 'Exitoso';
			state.chat = action.payload;
		})
		.addCase(checkUnreadMessages.rejected, (state, action) => {
			state.statusChat = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(markMessagesAsRead.pending, (state) => {
			state.statusChat = 'Cargando';
		})
		.addCase(markMessagesAsRead.fulfilled, (state, action) => {
			state.statusChat = 'Exitoso';
			state.chat = action.payload;
		})
		.addCase(markMessagesAsRead.rejected, (state, action) => {
			state.statusChat = 'Fallido';
			state.error = action.payload;
		});
};
