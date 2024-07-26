import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth, db } from '../../services/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

export const getUsers = createAsyncThunk('user/getAll', async () => {});

export const getUserById = createAsyncThunk('user/getById', async () => {});

export const registerUser = createAsyncThunk('user/register', async () => {});

export const loginUserWithEmail = createAsyncThunk(
  'user/login/email',
  async () => {}
);

export const loginUserWithGoogle = createAsyncThunk(
  'user/login/google',
  async () => {
    const googleProvider = new GoogleAuthProvider();

    const res = await signInWithPopup(auth, googleProvider);
    const currentUser = res.user;

    await setDoc(doc(db, 'users', currentUser.uid), {
      email: currentUser.email,
      fullName: currentUser.displayName,
      rol: 'user',
    });

    const userDoc = await getDoc(doc(db, 'users', currentUser.uid));

    return userDoc.data();
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  await signOut(auth);
});

export const verifyLoggedUser = createAsyncThunk(
  'user/login/email',
  async () => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          resolve(userDoc.data());
        } else {
          resolve(null);
        }
      });
    });
  }
);

export const deleteUserById = createAsyncThunk('user/delete', async () => {});

export const updateUser = createAsyncThunk('user/update', async () => {});
