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
  statusDelete: 'Inactivo',
  statusUpdate: 'Inactivo',
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: userExtraReducers,
});

export default userSlice.reducer;
