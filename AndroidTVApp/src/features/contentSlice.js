import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BASE_API_URL from '../apiConfig';

const initialState = {
  content: [],
  isLoading: false,
  isError: false,
  message: '',
};

export const fetchContent = createAsyncThunk('content/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/api/content/`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to fetch content';
    return thunkAPI.rejectWithValue(message);
  }
});

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.content = action.payload;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default contentSlice.reducer;
