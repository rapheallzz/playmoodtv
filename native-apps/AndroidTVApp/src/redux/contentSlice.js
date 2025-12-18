import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import contentService from '../services/contentService';

// Async thunk for fetching top 10 content (for the banner)
export const getTopTenContent = createAsyncThunk(
  'content/getTopTen',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await contentService.getTopTen(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

// Async thunk for fetching all other content
export const getAllContent = createAsyncThunk(
  'content/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await contentService.getAllContent(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

export const getContentById = createAsyncThunk(
    'content/getById',
    async (contentId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await contentService.getContentById(contentId, token);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.toString());
        }
    }
);

export const likeContent = createAsyncThunk(
    'content/like',
    async (contentId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await contentService.likeContent(contentId, token);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.toString());
        }
    }
);

export const unlikeContent = createAsyncThunk(
    'content/unlike',
    async (contentId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await contentService.unlikeContent(contentId, token);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.toString());
        }
    }
);

export const addToWatchlist = createAsyncThunk(
    'content/addToWatchlist',
    async (contentId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await contentService.addToWatchlist(contentId, token);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.toString());
        }
    }
);

export const removeFromWatchlist = createAsyncThunk(
    'content/removeFromWatchlist',
    async (contentId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await contentService.removeFromWatchlist(contentId, token);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.toString());
        }
    }
);

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    bannerContent: [],
    allContent: [],
    selectedContent: null,
    isLoading: false,
    isError: false,
    message: '',
  },
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Top Ten Content
      .addCase(getTopTenContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTopTenContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bannerContent = action.payload;
      })
      .addCase(getTopTenContent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // All Content
      .addCase(getAllContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allContent = action.payload;
      })
      .addCase(getAllContent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get Content By ID
      .addCase(getContentById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedContent = action.payload;
      })
      .addCase(getContentById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Like/Unlike/Watchlist actions will update the user object in authSlice,
      // so we just need to handle the pending/rejected states here for loading indicators.
      .addCase(likeContent.fulfilled, (state, action) => {
        // The user object in auth slice will be updated by a thunk in that slice
        if (state.selectedContent) {
            state.selectedContent.likes = action.payload.likes;
        }
      })
      .addCase(unlikeContent.fulfilled, (state, action) => {
        if (state.selectedContent) {
            state.selectedContent.likes = action.payload.likes;
        }
      })
      .addCase(addToWatchlist.fulfilled, (state, action) => {
        // The user object in auth slice will be updated
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        // The user object in auth slice will be updated
      });
  },
});

export const { reset } = contentSlice.actions;
export default contentSlice.reducer;
