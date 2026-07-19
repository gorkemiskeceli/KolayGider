import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://kolaygider-api.onrender.com/businesses';

export const fetchBusinesses = createAsyncThunk('business/fetchBusinesses', async () => {
  const response = await fetch(API_URL);
  return response.json();
});

export const updateBusinessStatus = createAsyncThunk(
  'business/updateStatus',
  async ({ id, status }) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!response.ok) throw new Error('Status update failed');
    return response.json();
  }
);

const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBusinesses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBusinesses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchBusinesses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateBusinessStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex(b => b.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default businessSlice.reducer;
