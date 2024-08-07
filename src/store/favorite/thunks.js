import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../services/firebase';
import {
  doc,
  getDoc,
  getDocs,
  query,
  collection,
  addDoc,
  deleteDoc,
  where,
} from 'firebase/firestore';

export const getFavorites = createAsyncThunk('favorite/getAll', async () => {
  const arrayAux = [];

  try {
    const querySnapshot = await getDocs(query(collection(db, 'favorites')));

    querySnapshot.forEach((doc) => {
      arrayAux.push({ uid: doc.id, ...doc.data() });
    });

    return arrayAux;
  } catch (error) {
    console.log(error);
  }
});

export const getFavoriteById = createAsyncThunk(
  'favorite/getById',
  async ({ id }) => {
    try {
      const querySnapshot = await getDoc(doc(db, 'favorites', id));

      if (querySnapshot.exists()) {
        return { uid: querySnapshot.id, ...querySnapshot.data() };
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const createFavorite = createAsyncThunk(
  'favorite/create',
  async (category, { rejectWithValue }) => {
    try {
      const res = await addDoc(collection(db, 'favorites'), category);

      const createdFavorite = await getDoc(doc(db, 'favorites', res.id));

      if (createdFavorite.exists()) {
        return { uid: createdFavorite.id, ...createdFavorite.data() };
      } else {
        return null;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteFavoriteById = createAsyncThunk(
  'favorite/delete',
  async ({ id }, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, 'favorites', id));
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
