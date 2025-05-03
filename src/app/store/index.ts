import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default is localStorage for web
import authReducer from './authSlice';

// Redux Persist configuration
const persistConfig = {
  key: 'root',
  storage, // using localStorage
  // whitelist: ['auth'], // Persist only the 'auth' slice
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, authReducer);

// Configure the store with the persisted reducer
const store = configureStore({
  reducer: {
    auth: persistedReducer, // Use persisted reducer for auth slice
  },
});

// Create a persistor instance
const persistor = persistStore(store);

// Export store and persistor so they can be used in the application
export { store, persistor };
