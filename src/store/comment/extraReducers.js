import { createComment, getComments } from './thunks';

export const commentExtraReducers = (builder) => {
  builder
    .addCase(createComment.pending, (state) => {
      state.statusCreate = 'Cargando';
    })
    .addCase(createComment.fulfilled, (state, action) => {
      state.statusCreate = 'Exitoso';
      state.comments = [...state.comments, action.payload];
    })
    .addCase(createComment.rejected, (state, action) => {
      state.statusCreate = 'Fallido';
      state.error = action.payload;
    });

  builder
    .addCase(getComments.pending, (state) => {
      state.statusComment = 'Cargando';
    })
    .addCase(getComments.fulfilled, (state, action) => {
      state.statusComment = 'Exitoso';
      state.comments = action.payload;
    })
    .addCase(getComments.rejected, (state, action) => {
      state.statusComment = 'Fallido';
      state.error = action.payload;
    });
};
