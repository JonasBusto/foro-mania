import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUsers = createAsyncThunk('user/getAll', async () => {});

export const getUserById = createAsyncThunk('user/getById', async () => {});

export const registerUser = createAsyncThunk('user/register', async () => {});

export const loginUser = createAsyncThunk('user/login', async () => {});

export const deleteUserById = createAsyncThunk('user/delete', async () => {});

export const updateUser = createAsyncThunk('user/update', async () => {});
