import { createSlice } from '@reduxjs/toolkit';

const storedUser = localStorage.getItem('kolaygider_user');

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: !!storedUser,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('kolaygider_user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('kolaygider_user');
    },
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('kolaygider_user', JSON.stringify(state.user));
      }
    }
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
