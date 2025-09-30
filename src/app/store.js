// src/app/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/authSlice';
import uploadReducer from '../features/uploadSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  upload: uploadReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  // We only want to persist auth state, not the upload state
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // Use the persisted, combined reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable values from redux-persist and our upload slice
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'upload/addUpload'],
        ignoredPaths: ['upload.uploads'], // Ignore the 'file' property in our uploads
      },
    }),
});

export const persistor = persistStore(store);