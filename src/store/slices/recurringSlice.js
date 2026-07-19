import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://kolaygider-api.onrender.com/recurring_payments';

export const fetchRecurringPayments = createAsyncThunk('recurring/fetchRecurringPayments', async (businessId) => {
  const response = await fetch(`${API_URL}?businessId=${businessId}`);
  return response.json();
});

export const addRecurringPayment = createAsyncThunk('recurring/addPayment', async (paymentData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentData)
  });
  if (!response.ok) throw new Error('Failed to add recurring payment');
  return response.json();
});

export const deleteRecurringPayment = createAsyncThunk('recurring/deletePayment', async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete recurring payment');
  return id;
});

export const updateRecurringPayment = createAsyncThunk('recurring/updatePayment', async ({ id, data }) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Failed to update recurring payment');
  return response.json();
});

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

const recurringSlice = createSlice({
  name: 'recurring',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecurringPayments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecurringPayments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchRecurringPayments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addRecurringPayment.fulfilled, (state, action) => {
        if (action.payload && action.payload.id) {
          state.items.push(action.payload);
        }
      })
      .addCase(deleteRecurringPayment.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(updateRecurringPayment.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default recurringSlice.reducer;
