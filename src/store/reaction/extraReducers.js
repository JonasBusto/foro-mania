import {
  createReaction,
  deleteReactionById,
  getReactionById,
  getReactions,
  updateReactionById,
} from './thunks';

export const reactionExtraReducers = (builder) => {
  builder
    .addCase(getReactions.pending, (state) => {
      state.status = 'Cargando';
    })
    .addCase(getReactions.fulfilled, (state, action) => {
      state.status = 'Exitoso';
      state.reactions = action.payload;
    })
    .addCase(getReactions.rejected, (state, action) => {
      state.status = 'Fallido';
      state.error = action.payload;
    });

  builder
    .addCase(getReactionById.pending, (state) => {
      state.statusReaction = 'Cargando';
    })
    .addCase(getReactionById.fulfilled, (state, action) => {
      state.statusReaction = 'Exitoso';
      state.reaction = action.payload;
    })
    .addCase(getReactionById.rejected, (state, action) => {
      state.statusReaction = 'Fallido';
      state.error = action.payload;
    });

  builder
    .addCase(createReaction.pending, (state) => {
      state.statusCreate = 'Cargando';
    })
    .addCase(createReaction.fulfilled, (state, action) => {
      state.statusCreate = 'Exitoso';
      state.reactions = [...state.reactions, action.payload];
    })
    .addCase(createReaction.rejected, (state, action) => {
      state.statusCreate = 'Fallido';
      state.error = action.payload;
    });

  builder
    .addCase(updateReactionById.pending, (state) => {
      state.statusUpdate = 'Cargando';
    })
    .addCase(updateReactionById.fulfilled, (state, action) => {
      state.statusUpdate = 'Exitoso';
      state.reactions = state.reactions.map((reaction) =>
        reaction.uid === action.payload.uid ? action.payload : reaction
      );
    })
    .addCase(updateReactionById.rejected, (state, action) => {
      state.statusUpdate = 'Fallido';
      state.error = action.payload;
    });

  builder
    .addCase(deleteReactionById.pending, (state) => {
      state.statusDelete = 'Cargando';
    })
    .addCase(deleteReactionById.fulfilled, (state, action) => {
      state.statusDelete = 'Exitoso';
      state.reactions = state.reactions.filter(
        (reaction) => reaction.uid !== action.payload
      );
    })
    .addCase(deleteReactionById.rejected, (state, action) => {
      state.statusDelete = 'Fallido';
      state.error = action.payload;
    });
};
