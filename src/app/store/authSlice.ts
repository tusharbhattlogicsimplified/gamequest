// src/store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/auth';

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      // Optional: Clear persisted state (if needed)
      // localStorage.removeItem('persist:root');
    },
  },
});

export const { register, logout, login } = authSlice.actions;
export default authSlice.reducer;
