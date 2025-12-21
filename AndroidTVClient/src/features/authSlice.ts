import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
import contentService from './contentService';
import AsyncStorage from '@react--native-async-storage/async-storage';

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const login = createAsyncThunk('auth/login', async (userData: any, thunkAPI) => {
  try {
    const response = await authService.login(userData);
    if (response) {
      await AsyncStorage.setItem('user', JSON.stringify(response));
    }
    return response;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      'Unable to connect to the server. Please try again later.';
    return thunkAPI.rejectWithValue(message);
  }
});

export const register = createAsyncThunk('auth/register', async (userData: any, thunkAPI) => {
    try {
        const response = await authService.register(userData);
        if (response) {
            await AsyncStorage.setItem('user', JSON.stringify(response));
        }
        return response;
    } catch (error: any) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            'Unable to connect to the server. Please try again later.';
        return thunkAPI.rejectWithValue(message);
    }
});

export const likeContent = createAsyncThunk('content/likeContent', async ({ contentId }: { contentId: string }, thunkAPI) => {
    try {
        const state: any = thunkAPI.getState();
        const token = state.auth.user?.token;
        if (!token) {
            throw new Error('No token found');
        }
        const response = await contentService.likeContent({ contentId, token });
        return response.contentId || contentId;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message || 'Error liking content');
    }
});

export const unlikeContent = createAsyncThunk('content/unlikeContent', async ({ contentId }: { contentId: string }, thunkAPI) => {
    try {
        const state: any = thunkAPI.getState();
        const token = state.auth.user?.token;
        if (!token) {
            throw new Error('No token found');
        }
        const response = await contentService.unlikeContent({ contentId, token });
        return response.contentId || contentId;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message || 'Error unliking content');
    }
});

export const addToWatchlist = createAsyncThunk('content/addToWatchlist', async ({ contentId }: { contentId: string }, thunkAPI) => {
    try {
        const state: any = thunkAPI.getState();
        const token = state.auth.user?.token;
        if (!token) {
            throw new Error('No token found');
        }
        const response = await contentService.addToWatchlist({ contentId, token });
        return response.contentId || contentId;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message || 'Error adding to watchlist');
    }
});

export const removeFromWatchlist = createAsyncThunk('content/removeFromWatchlist', async ({ contentId }: { contentId: string }, thunkAPI) => {
    try {
        const state: any = thunkAPI.getState();
        const token = state.auth.user?.token;
        if (!token) {
            throw new Error('No token found');
        }
        const response = await contentService.removeFromWatchlist({ contentId, token });
        return response.contentId || contentId;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message || 'Error removing from watchlist');
    }
});

export const logout = createAsyncThunk('auth/logout', async () => {
    await AsyncStorage.removeItem('user');
    return null;
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
    }
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(likeContent.fulfilled, (state, action) => {
        if (state.user) {
          state.user.like.push(action.payload);
        }
      })
      .addCase(unlikeContent.fulfilled, (state, action) => {
          if (state.user) {
            state.user.like = state.user.like.filter((id: string) => id !== action.payload);
          }
      })
      .addCase(addToWatchlist.fulfilled, (state, action) => {
          if (state.user) {
            state.user.watchlist.push(action.payload);
          }
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
            if (state.user) {
                state.user.watchlist = state.user.watchlist.filter((id: string) => id !== action.payload);
            }
      });
  },
});

export const { reset, setUser } = authSlice.actions;
export default authSlice.reducer;
