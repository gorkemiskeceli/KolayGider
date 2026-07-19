import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://kolaygider-api.onrender.com/categories';

export const fetchCategories = createAsyncThunk('category/fetchCategories', async (businessId) => {
  const response = await fetch(`${API_URL}?businessId=${businessId}`);
  return response.json();
});

export const addCategory = createAsyncThunk('category/addCategory', async (categoryData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoryData)
  });
  if (!response.ok) throw new Error('Failed to add category');
  return response.json();
});

export const deleteCategory = createAsyncThunk('category/deleteCategory', async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete category');
  return id;
});

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        if (action.payload && action.payload.id) {
          state.items.push(action.payload);
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export default categorySlice.reducer;
