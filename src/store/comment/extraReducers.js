import {
  createComment,
  deleteCommentById,
  getComments,
  updateCommentById,
  enableCommentById,
  disableCommentById,
} from './thunks';

export const commentExtraReducers = (builder) => {
  builder
    .addCase(createComment.pending, (state) => {
      state.statusCreate = 'Cargando';
    })
    .addCase(createComment.fulfilled, (state, action) => {
      state.statusCreate = 'Exitoso';
      const commentsOrderByDateCreated = [
        ...state.comments,
        action.payload,
      ].sort((a, b) => {
        if (a.createdAt > b.createdAt) {
          return -1;
        } else {
          return 1;
        }
      });
      state.comments = [...commentsOrderByDateCreated];
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

  builder
    .addCase(updateCommentById.pending, (state) => {
      state.statusUpdate = 'Cargando';
    })
    .addCase(updateCommentById.fulfilled, (state, action) => {
      state.statusUpdate = 'Exitoso';
      state.comments = state.comments.map((comment) =>
        comment.uid === action.payload.uid ? action.payload : comment
      );
    })
    .addCase(updateCommentById.rejected, (state, action) => {
      state.statusUpdate = 'Fallido';
      state.error = action.payload;
    });

  builder
    .addCase(enableCommentById.pending, (state) => {
      state.statusActive = 'Cargando';
    })
    .addCase(enableCommentById.fulfilled, (state, action) => {
      state.statusActive = 'Exitoso';
      state.comments = state.comments.map((comment) =>
        comment.uid === action.payload.uid ? action.payload : comment
      );
    })
    .addCase(enableCommentById.rejected, (state, action) => {
      state.statusActive = 'Fallido';
      state.error = action.payload;
    });

  builder
    .addCase(disableCommentById.pending, (state) => {
      state.statusActive = 'Cargando';
    })
    .addCase(disableCommentById.fulfilled, (state, action) => {
      state.statusActive = 'Exitoso';
      state.comments = state.comments.map((comment) =>
        comment.uid === action.payload.uid ? action.payload : comment
      );
    })
    .addCase(disableCommentById.rejected, (state, action) => {
      state.statusActive = 'Fallido';
      state.error = action.payload;
    });

  builder
    .addCase(deleteCommentById.pending, (state) => {
      state.statusDelete = 'Cargando';
    })
    .addCase(deleteCommentById.fulfilled, (state, action) => {
      state.statusDelete = 'Exitoso';
      state.comments = state.comments.filter(
        (comment) => comment.uid !== action.payload
      );
    })
    .addCase(deleteCommentById.rejected, (state, action) => {
      state.statusDelete = 'Fallido';
      state.error = action.payload;
    });
};
