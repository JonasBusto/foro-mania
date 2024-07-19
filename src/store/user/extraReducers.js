import { getUsers } from './thunks';

export const userExtraReducers = (builder) => {
  builder
    .addCase(getUsers.pending, (state) => {
      state.status = 'Cargando';
    })
    .addCase(getUsers.fulfilled, (state, action) => {
      state.status = 'Exitoso';
      state.users = action.payload;
    })
    .addCase(getUsers.rejected, (state, action) => {
      state.status = 'Fallido';
      state.error = action.payload;
    });
};
