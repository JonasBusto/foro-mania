import {
  createTag,
  deleteTagById,
  getTagById,
  getTags,
  updateTagById,
} from './thunks';

export const tagExtraReducers = (builder) => {
  builder
    .addCase(getTags.pending, (state) => {
      state.status = 'Cargando';
    })
    .addCase(getTags.fulfilled, (state, action) => {
      state.status = 'Exitoso';
      state.tags = action.payload;
    })
    .addCase(getTags.rejected, (state, action) => {
      state.status = 'Fallido';
      state.error = action.payload;
    });

  builder
    .addCase(getTagById.pending, (state) => {
      state.statusTag = 'Cargando';
    })
    .addCase(getTagById.fulfilled, (state, action) => {
      state.statusTag = 'Exitoso';
      state.tag = action.payload;
    })
    .addCase(getTagById.rejected, (state, action) => {
      state.statusTag = 'Fallido';
      state.error = action.payload;
    });

  builder
    .addCase(createTag.pending, (state) => {
      state.statusCreate = 'Cargando';
    })
    .addCase(createTag.fulfilled, (state, action) => {
      state.statusCreate = 'Exitoso';
      state.tags = [...state.tags, action.payload];
    })
    .addCase(createTag.rejected, (state, action) => {
      state.statusCreate = 'Fallido';
      state.error = action.payload;
    });

  builder
    .addCase(updateTagById.pending, (state) => {
      state.statusUpdate = 'Cargando';
    })
    .addCase(updateTagById.fulfilled, (state, action) => {
      state.statusUpdate = 'Exitoso';
      state.tags = state.tags.map((tag) =>
        tag.uid === action.payload.uid ? action.payload : tag
      );
    })
    .addCase(updateTagById.rejected, (state, action) => {
      state.statusUpdate = 'Fallido';
      state.error = action.payload;
    });

  builder
    .addCase(deleteTagById.pending, (state) => {
      state.statusDelete = 'Cargando';
    })
    .addCase(deleteTagById.fulfilled, (state, action) => {
      state.statusDelete = 'Exitoso';
      state.tags = state.tags.filter((tag) => tag.uid !== action.payload);
    })
    .addCase(deleteTagById.rejected, (state, action) => {
      state.statusDelete = 'Fallido';
      state.error = action.payload;
    });
};
