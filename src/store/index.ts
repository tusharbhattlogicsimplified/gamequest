// store/index.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './authSlice'; // your slice

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  // add other reducers here
});

// Redux Persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // only auth will be persisted
};

// Wrap root reducer with persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});

export const persistor = persistStore(store);

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
