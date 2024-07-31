import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/slice';
import categoryReducer from './category/slice';
import topicReducer from './topic/slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    topic: topicReducer,
  },
});
