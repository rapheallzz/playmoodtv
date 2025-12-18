import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import contentService from './contentService';

const initialState = {
  content: [],
  selectedContent: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get all content
export const fetchContent = createAsyncThunk(
  'content/getAll',
  async (_, thunkAPI) => {
    try {
      return await contentService.getContent();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get content by ID
export const fetchContentById = createAsyncThunk(
  'content/getById',
  async (contentId, thunkAPI) => {
    try {
      return await contentService.getContentById(contentId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    reset: (state) => {
      state.selectedContent = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.content = action.payload;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchContentById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedContent = action.payload;
      })
      .addCase(fetchContentById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = contentSlice.actions;
export default contentSlice.reducer;
