import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import contentService from '../services/contentService';

const initialState = {
  watchlist: [],
  likedContent: [],
  isLoading: false,
  isError: false,
};

export const getWatchlist = createAsyncThunk('userContent/getWatchlist', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    if (!token) throw new Error('No token found');
    return await contentService.getWatchlist({ token });
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getLikedContent = createAsyncThunk('userContent/getLikedContent', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    if (!token) throw new Error('No token found');
    return await contentService.getLikedContent({ token });
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const userContentSlice = createSlice({
  name: 'userContent',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWatchlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWatchlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.watchlist = action.payload;
      })
      .addCase(getWatchlist.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getLikedContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLikedContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.likedContent = action.payload;
      })
      .addCase(getLikedContent.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default userContentSlice.reducer;
