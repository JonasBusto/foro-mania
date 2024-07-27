import {
  createCategory,
  deleteCategoryById,
  getCategories,
  getCategoryById,
  updateCategoryById,
} from './thunks';

export const categoryExtraReducers = (builder) => {
  builder
    .addCase(getCategories.pending, (state) => {
      state.status = 'Cargando';
    })
    .addCase(getCategories.fulfilled, (state, action) => {
      state.status = 'Exitoso';
      state.categories = action.payload;
    })
    .addCase(getCategories.rejected, (state, action) => {
      state.status = 'Fallido';
      state.error = action.payload;
    });

  builder
    .addCase(getCategoryById.pending, (state) => {
      state.statusCategory = 'Cargando';
    })
    .addCase(getCategoryById.fulfilled, (state, action) => {
      state.statusCategory = 'Exitoso';
      state.category = action.payload;
    })
    .addCase(getCategoryById.rejected, (state, action) => {
      state.statusCategory = 'Fallido';
      state.error = action.payload;
    });

  builder
    .addCase(createCategory.pending, (state) => {
      state.statusCreate = 'Cargando';
    })
    .addCase(createCategory.fulfilled, (state, action) => {
      state.statusCreate = 'Exitoso';
      state.categories = [...state.categories, action.payload];
    })
    .addCase(createCategory.rejected, (state, action) => {
      state.statusCreate = 'Fallido';
      state.error = action.payload;
    });

  builder
    .addCase(updateCategoryById.pending, (state) => {
      state.statusUpdate = 'Cargando';
    })
    .addCase(updateCategoryById.fulfilled, (state, action) => {
      state.statusUpdate = 'Exitoso';
      state.categories = state.categories.map((category) =>
        category.uid === action.payload.uid ? action.payload : category
      );
    })
    .addCase(updateCategoryById.rejected, (state, action) => {
      state.statusUpdate = 'Fallido';
      state.error = action.payload;
    });

  builder
    .addCase(deleteCategoryById.pending, (state) => {
      state.statusDelete = 'Cargando';
    })
    .addCase(deleteCategoryById.fulfilled, (state, action) => {
      state.statusDelete = 'Exitoso';
      state.categories = state.categories.filter(
        (category) => category.uid !== action.payload
      );
    })
    .addCase(deleteCategoryById.rejected, (state, action) => {
      state.statusDelete = 'Fallido';
      state.error = action.payload;
    });
};
