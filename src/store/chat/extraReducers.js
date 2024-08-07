import {
	// getChats,
	findOrCreateChat,
	sendMessage,
	clearChatMessages,
	checkUnreadMessages,
	markMessagesAsRead,
} from './thunks';

export const chatExtraReducers = (builder) => {
	// builder
	//   .addCase(getChats.pending, (state) => {
	//     state.status = 'Cargando';
	//   })
	//   .addCase(getChats.fulfilled, (state, action) => {
	//     state.status = 'Exitoso';
	//     state.chats = action.payload;
	//   })
	//   .addCase(getChats.rejected, (state, action) => {
	//     state.status = 'Fallido';
	//     state.error = action.payload;
	//   });

	builder
		.addCase(findOrCreateChat.pending, (state) => {
			state.statusChat = 'Cargando';
		})
		.addCase(findOrCreateChat.fulfilled, (state, action) => {
			state.statusChat = 'Exitoso';
			state.chat = action.payload.chatId; 
		})
		.addCase(findOrCreateChat.rejected, (state, action) => {
			state.statusChat = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(sendMessage.pending, (state) => {
			state.statusMsg = 'Cargando';
		})
		.addCase(sendMessage.fulfilled, (state, action) => {
			state.statusMsg = 'Exitoso';
			state.chat = action.payload;
		})
		.addCase(sendMessage.rejected, (state, action) => {
			state.statusMsg = 'Fallido';
			state.error = action.payload;
		});

	builder
		.addCase(clearChatMessages.pending, (state) => {
			state.statusChat = 'Cargando';
		})
		.addCase(clearChatMessages.fulfilled, (state, action) => {
			state.statusChat = 'Exitoso';
			state.chat = action.payload;
		})
		.addCase(clearChatMessages.rejected, (state, action) => {
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
