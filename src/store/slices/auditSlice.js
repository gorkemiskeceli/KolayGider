import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:3000/audit_logs';

export const fetchAuditLogs = createAsyncThunk('audit/fetchAuditLogs', async () => {
  const response = await fetch(API_URL);
  return response.json();
});

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

const auditSlice = createSlice({
  name: 'audit',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuditLogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAuditLogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchAuditLogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default auditSlice.reducer;
