import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import contentReducer from './contentSlice';
import userContentReducer from './userContentSlice';
import topTenReducer from './topTenSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    content: contentReducer,
    userContent: userContentReducer,
    topTen: topTenReducer,
  },
});
