import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Get user from AsyncStorage
const getUserFromStorage = async () => {
  const user = await AsyncStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
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

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

// Like content
export const likeContent = createAsyncThunk(
  'auth/likeContent',
  async (contentId, thunkAPI) => {
    try {
      const user = thunkAPI.getState().auth.user;
      if (!user || !user.token) {
        return thunkAPI.rejectWithValue('User not logged in');
      }
      return await authService.likeContent(contentId, user.token);
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

// Unlike content
export const unlikeContent = createAsyncThunk(
  'auth/unlikeContent',
  async (contentId, thunkAPI) => {
    try {
      const user = thunkAPI.getState().auth.user;
      if (!user || !user.token) {
        return thunkAPI.rejectWithValue('User not logged in');
      }
      return await authService.unlikeContent(contentId, user.token);
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

// Add to watchlist
export const addToWatchlist = createAsyncThunk(
  'auth/addToWatchlist',
  async (contentId, thunkAPI) => {
    try {
      const user = thunkAPI.getState().auth.user;
      if (!user || !user.token) {
        return thunkAPI.rejectWithValue('User not logged in');
      }
      return await authService.addToWatchlist(contentId, user.token);
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

// Remove from watchlist
export const removeFromWatchlist = createAsyncThunk(
  'auth/removeFromWatchlist',
  async (contentId, thunkAPI) => {
    try {
      const user = thunkAPI.getState().auth.user;
      if (!user || !user.token) {
        return thunkAPI.rejectWithValue('User not logged in');
      }
      return await authService.removeFromWatchlist(contentId, user.token);
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
        state.message = action.payload;
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
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(likeContent.fulfilled, (state, action) => {
        state.user.like.push(action.payload);
      })
      .addCase(unlikeContent.fulfilled, (state, action) => {
        state.user.like = state.user.like.filter(
          (contentId) => contentId !== action.payload
        );
      })
      .addCase(addToWatchlist.fulfilled, (state, action) => {
        state.user.watchlist.push(action.payload);
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        state.user.watchlist = state.user.watchlist.filter(
          (contentId) => contentId !== action.payload
        );
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
