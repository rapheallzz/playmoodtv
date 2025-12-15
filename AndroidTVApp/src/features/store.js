import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import contentReducer from './contentSlice';
import userContentReducer from './userContentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    content: contentReducer,
    userContent: userContentReducer,
  },
});
