import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API_URL from '../config/apiConfig';

export const fetchContent = createAsyncThunk('content/fetchContent', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}/api/content/`);
    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      'Unable to connect to the server. Please try again later.';
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  content: [],
  isLoading: false,
  isError: false,
  message: '',
};

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
        state.message = action.payload as string;
      });
  },
});

export default contentSlice.reducer;
