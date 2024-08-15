import { createAsyncThunk } from '@reduxjs/toolkit';
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
import { db, storage } from '../../services/firebase';

export const getTopics = createAsyncThunk('topic/getAll', async () => {
  try {
    const querySnapshot = await getDocs(query(collection(db, 'topics')));
    const topicData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return topicData;
  } catch (error) {
    console.log(error);
  }
});

export const getTopicById = createAsyncThunk('topic/getById', async (id) => {
  try {
    const querySnapshot = await getDoc(doc(db, 'topics', id));

    if (querySnapshot.exists()) {
      return { uid: querySnapshot.id, ...querySnapshot.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
});

export const createTopic = createAsyncThunk(
  'topic/create',
  async (topic, { rejectWithValue }) => {
    try {
      const imageRegex = /<img[^>]+src="([^">]+)"/g;
      const imageUrls = [];
      let match;

      while ((match = imageRegex.exec(topic.content)) !== null) {
        imageUrls.push(match[1]);
      }

      let updatedContent = topic.content;

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

      const topicData = {
        ...topic,
        content: updatedContent,
      };

      const res = await addDoc(collection(db, 'topics'), topicData);

      const createdTopic = await getDoc(doc(db, 'topics', res.id));

      if (createdTopic.exists()) {
        return { uid: createdTopic.id, ...createdTopic.data() };
      } else {
        return null;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTopicById = createAsyncThunk(
  'topic/update',
  async ({ topic, id }, { rejectWithValue }) => {
    try {
      const topicDoc = doc(db, 'topics', id);
      await updateDoc(topicDoc, topic);

      const updatedTopic = await getDoc(topicDoc);

      if (updatedTopic.exists()) {
        return { uid: updatedTopic.id, ...updatedTopic.data() };
      } else {
        return null;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const disableTopicById = createAsyncThunk(
  'topic/disable',
  async ({ id }, { rejectWithValue }) => {
    console.log(id)
    try {
      const topicDoc = doc(db, 'topics', id);
      await updateDoc(topicDoc, { isActive: false });
      const updatedTopic = await getDoc(topicDoc);
      if (updatedTopic.exists()) {
        return { uid: updatedTopic.id, ...updatedTopic.data() };
      } else {
        return null;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const enableTopicById = createAsyncThunk(
  'topic/enable',
  async ({ id }, { rejectWithValue }) => {
    console.log(id)

    try {
      const topicDoc = doc(db, 'topics', id);
      await updateDoc(topicDoc, { isActive: true });
      const updatedTopic = await getDoc(topicDoc);
      if (updatedTopic.exists()) {
        return { uid: updatedTopic.id, ...updatedTopic.data() };
      } else {
        return null;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTopicById = createAsyncThunk(
  'topic/delete',
  async ({ id }, { rejectWithValue }) => {
    try {
      const commentsOfTopic = await getDocs(
        query(collection(db, 'comments'), where('topicId', '==', id))
      );

      commentsOfTopic.forEach(async (comment) => {
        const reactionsOfComment = await getDocs(
          query(
            collection(db, 'reactions'),
            where('contentId', '==', comment.id)
          )
        );

        reactionsOfComment.forEach(async (reaction) => {
          await deleteDoc(reaction.ref);
        });
        await deleteDoc(comment.ref);
      });

      await deleteDoc(doc(db, 'topics', id));
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
