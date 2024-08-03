import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../services/firebase';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
} from 'firebase/firestore';

export const getComments = createAsyncThunk(
  'comment/getAll',
  async (id, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(query(collection(db, 'comments')));

      const filteredComments = querySnapshot.docs
        .map((doc) => ({ uid: doc.id, ...doc.data() }))
        .filter((comment) => comment.topicId === id);

      return filteredComments;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createComment = createAsyncThunk(
  'comment/create',
  async (comment, { rejectWithValue }) => {
    try {
      const res = await addDoc(collection(db, 'comments'), comment);

      const createdComment = await getDoc(doc(db, 'comments', res.id));

      if (createdComment.exists()) {
        return { uid: createdComment.id, ...createdComment.data() };
      } else {
        return null;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
