import { createSlice } from '@reduxjs/toolkit';
import { userExtraReducers } from './extraReducers';

const initialState = {
  users: [],
  user: null,
  loggedUser: null,
  status: 'Inactivo',
  statusUser: 'Inactivo',
  statusLogin: 'Inactivo',
  statusRegister: 'Inactivo',
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
