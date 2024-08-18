import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../services/firebase';
import {
  doc,
  getDoc,
  getDocs,
  query,
  collection,
  updateDoc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';

export const getTags = createAsyncThunk('tag/getAll', async () => {
  const arrayAux = [];

  try {
    const querySnapshot = await getDocs(query(collection(db, 'tags')));

    querySnapshot.forEach((doc) => {
      arrayAux.push({ uid: doc.id, ...doc.data() });
    });

    return arrayAux;
  } catch (error) {
    console.log(error);
  }
});

export const getTagById = createAsyncThunk('tag/getById', async ({ id }) => {
  try {
    const querySnapshot = await getDoc(doc(db, 'tags', id));

    if (querySnapshot.exists()) {
      return { uid: querySnapshot.id, ...querySnapshot.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
});

export const createTag = createAsyncThunk(
  'tag/create',
  async (tag, { rejectWithValue }) => {
    try {
      const res = await addDoc(collection(db, 'tags'), tag);

      const createdTag = await getDoc(doc(db, 'tags', res.id));

      if (createdTag.exists()) {
        return { uid: createdTag.id, ...createdTag.data() };
      } else {
        return null;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTagById = createAsyncThunk(
  'tag/update',
  async ({ tag, id }, { rejectWithValue }) => {
    try {
      const tagDoc = doc(db, 'tags', id);
      await updateDoc(tagDoc, tag);

      const updatedTag = await getDoc(tagDoc);

      if (updatedTag.exists()) {
        return { uid: updatedTag.id, ...updatedTag.data() };
      } else {
        return null;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTagById = createAsyncThunk(
  'tag/delete',
  async ({ id }, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, 'tags', id));
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
