import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  registerModal: false,
  loginModal: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    switchRegister: (state) => {
      state.registerModal = !state.registerModal;
    },
    switchLogin: (state) => {
      state.loginModal = !state.loginModal;
    },
  },
});

export const { switchLogin, switchRegister } = modalSlice.actions;
export default modalSlice.reducer;
