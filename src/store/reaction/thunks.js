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
  updateDoc,
} from 'firebase/firestore';

export const getReactions = createAsyncThunk('reaction/getAll', async () => {
  const arrayAux = [];

  try {
    const querySnapshot = await getDocs(query(collection(db, 'reactions')));

    querySnapshot.forEach((doc) => {
      arrayAux.push({ uid: doc.id, ...doc.data() });
    });

    return arrayAux;
  } catch (error) {
    console.log(error);
  }
});

export const getReactionById = createAsyncThunk(
  'reaction/getById',
  async ({ id }) => {
    try {
      const querySnapshot = await getDoc(doc(db, 'reactions', id));

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

export const createReaction = createAsyncThunk(
  'reaction/create',
  async (category, { rejectWithValue }) => {
    try {
      const res = await addDoc(collection(db, 'reactions'), category);

      const createdReaction = await getDoc(doc(db, 'reactions', res.id));

      if (createdReaction.exists()) {
        return { uid: createdReaction.id, ...createdReaction.data() };
      } else {
        return null;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateReactionById = createAsyncThunk(
  'reaction/update',
  async ({ reaction, id }, { rejectWithValue }) => {
    try {
      const reactionDoc = doc(db, 'reactions', id);
      await updateDoc(reactionDoc, reaction);

      const updatedReaction = await getDoc(reactionDoc);

      if (updatedReaction.exists()) {
        return { uid: updatedReaction.id, ...updatedReaction.data() };
      } else {
        return null;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteReactionById = createAsyncThunk(
  'reaction/delete',
  async ({ id }, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, 'reactions', id));
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
