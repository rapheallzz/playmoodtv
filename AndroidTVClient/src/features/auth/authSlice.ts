import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
import contentService from '../content/contentService';
import { User } from '../../types';

interface AuthState {
  user: User | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: AuthState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Login user
export const login = createAsyncThunk('auth/login', async (user: any, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Register user
export const register = createAsyncThunk('auth/register', async (user: any, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

// Like content
export const likeContent = createAsyncThunk('auth/likeContent', async ({ contentId }: { contentId: string }, thunkAPI) => {
    try {
        const token = (thunkAPI.getState() as any).auth.user.token;
        return await contentService.likeContent(contentId, token);
    } catch (error: any) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Unlike content
export const unlikeContent = createAsyncThunk('auth/unlikeContent', async ({ contentId }: { contentId: string }, thunkAPI) => {
    try {
        const token = (thunkAPI.getState() as any).auth.user.token;
        return await contentService.unlikeContent(contentId, token);
    } catch (error: any) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Add to watchlist
export const addToWatchlist = createAsyncThunk('auth/addToWatchlist', async ({ contentId }: { contentId: string }, thunkAPI) => {
    try {
        const token = (thunkAPI.getState() as any).auth.user.token;
        return await contentService.addToWatchlist(contentId, token);
    } catch (error: any) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Remove from watchlist
export const removeFromWatchlist = createAsyncThunk('auth/removeFromWatchlist', async ({ contentId }: { contentId: string }, thunkAPI) => {
    try {
        const token = (thunkAPI.getState() as any).auth.user.token;
        return await contentService.removeFromWatchlist(contentId, token);
    } catch (error: any) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(likeContent.fulfilled, (state, action) => {
        if (state.user) {
          state.user.like = action.payload.likes;
        }
      })
      .addCase(unlikeContent.fulfilled, (state, action) => {
        if (state.user) {
            state.user.like = action.payload.likes;
        }
      })
      .addCase(addToWatchlist.fulfilled, (state, action) => {
        if (state.user) {
            state.user.watchlist = action.payload.watchlist;
        }
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        if (state.user) {
            state.user.watchlist = action.payload.watchlist;
        }
      });
  },
});

export const { reset, setUser } = authSlice.actions;
export default authSlice.reducer;
