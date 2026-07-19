import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:3000/expenses';

// Strict Tenant Isolation: Always pass businessId
export const fetchExpenses = createAsyncThunk('expense/fetchExpenses', async (businessId) => {
  const response = await fetch(`${API_URL}?businessId=${businessId}`);
  return response.json();
});

export const addExpense = createAsyncThunk('expense/addExpense', async (expenseData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expenseData)
  });
  if (!response.ok) throw new Error('Failed to save');
  return response.json();
});

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        if (action.payload && action.payload.id) {
          state.items.push(action.payload);
        }
      });
  },
});

export default expenseSlice.reducer;
