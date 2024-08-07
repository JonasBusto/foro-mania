import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth, db, storage } from '../../services/firebase';
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  collection,
  updateDoc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

export const getCategories = createAsyncThunk('category/getAll', async () => {
  const arrayAux = [];

  try {
    const querySnapshot = await getDocs(query(collection(db, 'categories')));

    querySnapshot.forEach((doc) => {
      arrayAux.push({ uid: doc.id, ...doc.data() });
    });

    return arrayAux;
  } catch (error) {
    console.log(error);
  }
});

export const getCategoryById = createAsyncThunk(
  'category/getById',
  async ({ id }) => {
    try {
      const querySnapshot = await getDoc(doc(db, 'categories', id));

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

export const createCategory = createAsyncThunk(
  'category/create',
  async (category, { rejectWithValue }) => {
    try {
      const res = await addDoc(collection(db, 'categories'), category);

      const createdCategory = await getDoc(doc(db, 'categories', res.id));

      if (createdCategory.exists()) {
        return { uid: createdCategory.id, ...createdCategory.data() };
      } else {
        return null;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCategoryById = createAsyncThunk(
  'category/update',
  async ({ category, id }, { rejectWithValue }) => {
    try {
      const categoryDoc = doc(db, 'categories', id);
      await updateDoc(categoryDoc, category);

      const updatedCategory = await getDoc(categoryDoc);

      if (updatedCategory.exists()) {
        return { uid: updatedCategory.id, ...updatedCategory.data() };
      } else {
        return null;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCategoryById = createAsyncThunk(
  'category/delete',
  async ({ id }, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, 'categories', id));
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
