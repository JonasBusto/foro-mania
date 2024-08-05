import { createAsyncThunk } from '@reduxjs/toolkit';
import { db, storage } from '../../services/firebase';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const getComments = createAsyncThunk(
  'comment/getAll',
  async (id, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(query(collection(db, 'comments')));
      const allComments = querySnapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));

      if (id) {
        const filteredComments = allComments.filter((comment) => comment.topicId === id);
        return filteredComments;
      }

      return allComments;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createComment = createAsyncThunk(
  'comment/create',
  async (comment, { rejectWithValue }) => {
    try {
      const imageRegex = /<img[^>]+src="([^">]+)"/g;
      const imageUrls = [];
      let match;

      while ((match = imageRegex.exec(comment.content)) !== null) {
        imageUrls.push(match[1]);
      }

      let updatedContent = comment.content;

      for (const url of imageUrls) {
        const response = await fetch(url);
        const blob = await response.blob();

        const imageRef = ref(
          storage,
          `images/${Date.now()}_${url.split('/').pop()}`
        );
        await uploadBytes(imageRef, blob);

        const newUrl = await getDownloadURL(imageRef);

        updatedContent = updatedContent.replace(url, newUrl);
      }

      const commentData = {
        ...comment,
        content: updatedContent,
      };

      const res = await addDoc(collection(db, 'comments'), commentData);

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
