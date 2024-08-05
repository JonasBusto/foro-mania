import {
  getUserById,
  getUsers,
  loginUserWithEmail,
  loginUserWithGoogle,
  logoutUser,
  registerUser,
  updateUser,
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
    .addCase(getUserById.pending, (state) => {
      state.statusUser = 'Cargando';
    })
    .addCase(getUserById.fulfilled, (state, action) => {
      state.statusUser = 'Exitoso';
      state.user = action.payload;
    })
    .addCase(getUserById.rejected, (state, action) => {
      state.statusUser = 'Fallido';
      state.error = action.payload;
    });

  builder
    .addCase(loginUserWithGoogle.pending, (state) => {
      state.statusSign = 'Cargando';
    })
    .addCase(loginUserWithGoogle.fulfilled, (state, action) => {
      state.statusSign = 'Exitoso';
      state.loggedUser = action.payload;
    })
    .addCase(loginUserWithGoogle.rejected, (state, action) => {
      state.statusSign = 'Fallido';
      state.error = action.payload;
    });

  builder
    .addCase(loginUserWithEmail.pending, (state) => {
      state.statusSign = 'Cargando';
    })
    .addCase(loginUserWithEmail.fulfilled, (state, action) => {
      state.statusSign = 'Exitoso';
      state.loggedUser = action.payload;
    })
    .addCase(loginUserWithEmail.rejected, (state, action) => {
      state.statusSign = 'Fallido';
      state.error = action.payload;
    });

  builder
    .addCase(registerUser.pending, (state) => {
      state.statusSign = 'Cargando';
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.statusSign = 'Exitoso';
      state.loggedUser = action.payload;
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.statusSign = 'Fallido';
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

  builder
    .addCase(updateUser.pending, (state) => {
      state.statusUpdate = 'Cargando';
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.statusUpdate = 'Exitoso';
      state.loggedUser = action.payload;
    })
    .addCase(updateUser.rejected, (state, action) => {
      state.statusUpdate = 'Fallido';
      state.error = action.payload;
    });
};
