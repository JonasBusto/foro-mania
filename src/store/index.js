import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/slice';
import categoryReducer from './category/slice';
import topicReducer from './topic/slice';
import commentReducer from './comment/slice';
import reactionReducer from './reaction/slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    topic: topicReducer,
    comment: commentReducer,
    reaction: reactionReducer,
  },
});
