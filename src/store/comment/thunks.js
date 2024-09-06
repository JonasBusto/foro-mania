import { createAsyncThunk } from '@reduxjs/toolkit';
import { db, storage } from '../../services/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const getComments = createAsyncThunk(
  'comment/getAll',
  async (id, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(query(collection(db, 'comments')));
      const allComments = querySnapshot.docs
        .map((doc) => ({
          uid: doc.id,
          ...doc.data(),
        }))
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return -1;
          } else {
            return 1;
          }
        });

      if (id) {
        const filteredComments = allComments.filter(
          (comment) => comment.topicId === id
        );
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

export const updateCommentById = createAsyncThunk(
  'comment/update',
  async ({ comment, id }, { rejectWithValue }) => {
    try {
      const imageRegex = /<img[^>]+src="([^">]+)"/g;
      const imageUrls = [];
      let match;

      while ((match = imageRegex.exec(comment.content)) !== null) {
        imageUrls.push(match[1]);
      }

      let updatedContent = comment.content;

      for (const url of imageUrls) {
        if (!url.startsWith('https://firebasestorage.googleapis.com/')) {
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
      }

      const commentData = {
        ...comment,
        content: updatedContent,
      };

      const commentDoc = doc(db, 'comments', id);
      await updateDoc(commentDoc, commentData);

      const updatedComment = await getDoc(commentDoc);

      if (updatedComment.exists()) {
        return { uid: updatedComment.id, ...updatedComment.data() };
      } else {
        return null;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const disableCommentById = createAsyncThunk(
  'comment/disable',
  async ({ id }, { rejectWithValue }) => {
    try {
      const commentDoc = doc(db, 'comments', id);
      await updateDoc(commentDoc, { isActive: false });
      const updatedComment = await getDoc(commentDoc);
      if (updatedComment.exists()) {
        return { uid: updatedComment.id, ...updatedComment.data() };
      } else {
        return null;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const enableCommentById = createAsyncThunk(
  'comment/enable',
  async ({ id }, { rejectWithValue }) => {
    try {
      const commentDoc = doc(db, 'comments', id);
      await updateDoc(commentDoc, { isActive: true });
      const updatedComment = await getDoc(commentDoc);
      if (updatedComment.exists()) {
        return { uid: updatedComment.id, ...updatedComment.data() };
      } else {
        return null;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCommentById = createAsyncThunk(
  'comment/delete',
  async ({ id }, { rejectWithValue }) => {
    try {
      const reactionsOfComment = await getDocs(
        query(collection(db, 'reactions'), where('contentId', '==', id))
      );

      reactionsOfComment.forEach(async (reaction) => {
        await deleteDoc(reaction.ref);
      });

      await deleteDoc(doc(db, 'comments', id));
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
