import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import contentService from './contentService';

interface Content {
  _id: string;
  title: string;
  description: string;
  video: string;
  thumbnail: string;
  category: string;
}

interface ContentState {
  content: Content[];
  topTenContent: Content[];
  selectedContent: Content | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: ContentState = {
  content: [],
  topTenContent: [],
  selectedContent: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const fetchContent = createAsyncThunk('content/fetchAll', async (_, thunkAPI) => {
  try {
    return await contentService.getContent();
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchContentById = createAsyncThunk('content/fetchById', async (contentId: string, thunkAPI) => {
    try {
      return await contentService.getContentById(contentId);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  });

export const fetchTopTenContent = createAsyncThunk('content/fetchTopTen', async (_, thunkAPI) => {
    try {
      return await contentService.getTopTenContent();
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  });

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
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
        state.message = action.payload as string;
      })
      .addCase(fetchTopTenContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTopTenContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.topTenContent = action.payload;
      })
      .addCase(fetchTopTenContent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
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
        state.message = action.payload as string;
      });
  },
});

export const { reset } = contentSlice.actions;
export default contentSlice.reducer;
