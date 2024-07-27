import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/slice';
import categoryReducer from './category/slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
  },
});
