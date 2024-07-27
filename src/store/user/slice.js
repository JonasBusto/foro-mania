import { createSlice } from '@reduxjs/toolkit';
import { userExtraReducers } from './extraReducers';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../services/firebase';

const initialState = {
  users: [],
  user: null,
  loggedUser: null,
  status: 'Inactivo',
  statusUser: 'Inactivo',
  statusAuth: 'Inactivo',
  statusSign: 'Inactivo',
  statusDelete: 'Inactivo',
  statusUpdate: 'Inactivo',
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser(state) {
      state.user = null;
    },
  },
  extraReducers: userExtraReducers,
});

export default userSlice.reducer;
export const { clearUser } = userSlice.actions;
