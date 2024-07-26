import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth, db } from '../../services/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';

export const getUsers = createAsyncThunk('user/getAll', async () => {});

export const getUserById = createAsyncThunk('user/getById', async () => {});

export const registerUser = createAsyncThunk(
  'user/register',
  async (user, { rejectWithValue }) => {
    const { fullName, email, password, photoProfile, role } = user;

    try {
      const currentUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, {
        displayName: fullName,
        photoURL: photoProfile,
      });

      await setDoc(doc(db, 'users', currentUser.user.uid), {
        email: currentUser.user.email,
        fullName: currentUser.user.displayName,
        photoProfile: currentUser.user.photoURL,
        role: role,
      });

      const userDoc = await getDoc(doc(db, 'users', currentUser.user.uid));

      return userDoc.data();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        return rejectWithValue('Email en uso');
      } else {
        return rejectWithValue(error.code);
      }
    }
  }
);

export const loginUserWithEmail = createAsyncThunk(
  'user/loginWithEmail',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const signWithEmail = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userDoc = await getDoc(doc(db, 'users', signWithEmail.user.uid));

      return userDoc.data();
    } catch (error) {
      if (
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/invalid-credential'
      ) {
        return rejectWithValue('Email o contraseña incorrectos');
      } else if (error.code === 'auth/too-many-requests') {
        return rejectWithValue(
          'Intentaste iniciar sesión muchas veces. Cambia la contraseña o intentalo mas tarde.'
        );
      }
    }
  }
);

export const loginUserWithGoogle = createAsyncThunk(
  'user/loginWithGoogle',
  async () => {
    const googleProvider = new GoogleAuthProvider();

    const res = await signInWithPopup(auth, googleProvider);
    const currentUser = res.user;

    await setDoc(doc(db, 'users', currentUser.uid), {
      email: currentUser.email,
      fullName: currentUser.displayName,
      photoProfile: currentUser.photoURL,
      role: 'user',
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
    return new Promise((resolve) => {
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
