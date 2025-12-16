import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';
import contentService from '../services/contentService';
import { decodeToken } from '../utils/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: null,
  userToken: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  watchlist: [],
  likedContent: [],
};

export const restoreUser = createAsyncThunk('auth/restoreUser', async (_, thunkAPI) => {
  try {
    const storedUser = await AsyncStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user?.token) {
        const decoded = decodeToken(user.token);
        if (decoded) {
          return user;
        }
      }
    }
    return thunkAPI.rejectWithValue('No valid user found');
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to restore user');
  }
});

export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const response = await authService.login(userData);
    const decoded = decodeToken(response.token);
    if (!decoded) {
      throw new Error('Received expired token');
    }
    const userWithToken = {
      ...response.user,
      userId: decoded.id || response.user._id,
      token: response.token,
    };
    await AsyncStorage.setItem('user', JSON.stringify(userWithToken));
    return userWithToken;
  } catch (error) {
    const message = error.response?.data?.message || 'Login failed';
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
  return null;
});

export const likeContent = createAsyncThunk('content/likeContent', async ({ contentId }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    if (!token) throw new Error('No token found');
    await contentService.likeContent({ contentId, token });
    return contentId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const unlikeContent = createAsyncThunk('content/unlikeContent', async ({ contentId }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    if (!token) throw new Error('No token found');
    await contentService.unlikeContent({ contentId, token });
    return contentId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addToWatchlist = createAsyncThunk('content/addToWatchlist', async ({ contentId }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    if (!token) throw new Error('No token found');
    await contentService.addToWatchlist({ contentId, token });
    return contentId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const removeFromWatchlist = createAsyncThunk('content/removeFromWatchlist', async ({ contentId }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    if (!token) throw new Error('No token found');
    await contentService.removeFromWatchlist({ contentId, token });
    return contentId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(restoreUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.userToken = action.payload.token;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.userToken = action.payload.token;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.userToken = null;
      })
      .addCase(likeContent.fulfilled, (state, action) => {
        if (state.user) {
          state.user.likes = [...(state.user.likes || []), action.payload];
        }
      })
      .addCase(unlikeContent.fulfilled, (state, action) => {
        if (state.user) {
          state.user.likes = state.user.likes?.filter((id) => id !== action.payload) || [];
        }
      })
      .addCase(addToWatchlist.fulfilled, (state, action) => {
        if (state.user) {
          state.user.watchlist = [...(state.user.watchlist || []), action.payload];
        }
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        if (state.user) {
          state.user.watchlist = state.user.watchlist?.filter((id) => id !== action.payload) || [];
        }
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
