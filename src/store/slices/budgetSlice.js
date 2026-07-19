import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://kolaygider-api.onrender.com/budgets';

export const fetchBudgets = createAsyncThunk('budget/fetchBudgets', async (businessId) => {
  const response = await fetch(`${API_URL}?businessId=${businessId}`);
  return response.json();
});

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudgets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBudgets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchBudgets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default budgetSlice.reducer;
