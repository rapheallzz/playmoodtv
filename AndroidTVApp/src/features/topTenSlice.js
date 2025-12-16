import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import contentService from '../services/contentService';

const initialState = {
  topTen: [],
  isLoading: false,
  isError: false,
};

export const getTopTen = createAsyncThunk('topTen/getTopTen', async (_, thunkAPI) => {
  try {
    return await contentService.getTopTen();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const topTenSlice = createSlice({
  name: 'topTen',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTopTen.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTopTen.fulfilled, (state, action) => {
        state.isLoading = false;
        state.topTen = action.payload;
      })
      .addCase(getTopTen.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default topTenSlice.reducer;
