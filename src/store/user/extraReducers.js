import {
  getUsers,
  loginUserWithGoogle,
  logoutUser,
  verifyLoggedUser,
} from './thunks';

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

  builder
    .addCase(loginUserWithGoogle.pending, (state) => {
      state.statusAuth = 'Cargando';
    })
    .addCase(loginUserWithGoogle.fulfilled, (state, action) => {
      state.statusAuth = 'Exitoso';
      state.loggedUser = action.payload;
    })
    .addCase(loginUserWithGoogle.rejected, (state, action) => {
      state.statusAuth = 'Fallido';
      state.error = action.payload;
    });

  builder
    .addCase(verifyLoggedUser.pending, (state) => {
      state.statusAuth = 'Cargando';
    })
    .addCase(verifyLoggedUser.fulfilled, (state, action) => {
      state.statusAuth = 'Exitoso';
      state.loggedUser = action.payload;
    })
    .addCase(verifyLoggedUser.rejected, (state, action) => {
      state.statusAuth = 'Fallido';
      state.error = action.payload;
    });

  builder
    .addCase(logoutUser.pending, (state) => {
      state.statusLoggedUser = 'Cargando';
    })
    .addCase(logoutUser.fulfilled, (state, action) => {
      state.statusLoggedUser = 'Exitoso';
      state.loggedUser = null;
    })
    .addCase(logoutUser.rejected, (state, action) => {
      state.statusLoggedUser = 'Fallido';
      state.error = action.payload;
    });
};
