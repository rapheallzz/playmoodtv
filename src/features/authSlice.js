import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const API_URL = 'https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/user/';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? { ...user, role: user.role } : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    const response = await authService.register(user);
    console.log('Registration successful:', response);

    // Update the payload to include the role
    return { ...response.data, role: response.data.role };
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    const response = await authService.login(user);
    console.log('Login successful:', response);

    // Update the payload to include the role
    return { ...response, role: response.role };
  } catch (error) {
    console.error('Login failed:', error);
    return thunkAPI.rejectWithValue(error.message || 'Login failed');
  }
});

// Like video
export const likeVideo = createAsyncThunk('auth/likeVideo', async ({ userId, videoId }, thunkAPI) => {
  try {
    const response = await authService.likeVideo({ userId, videoId });
    console.log('Video liked successfully:', response);

    // Update the payload if needed
    return response.data;
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Share video
export const shareVideo = createAsyncThunk('auth/shareVideo', async ({ userId, videoId }, thunkAPI) => {
  try {
    // Make an API request to share the video
    const response = await authService.shareVideo(userId, videoId);
    console.log('Video shared successfully:', response);
    return response.data;
  } catch (error) {
    console.error('Error sharing video:', error);
    return thunkAPI.rejectWithValue(error.message || 'Error sharing video');
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
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
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = { ...action.payload, role: action.payload.role };
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
        state.user = { ...action.payload, role: action.payload.role };
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
      .addCase(likeVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // You can handle success actions for likeVideo here if needed
      })
      .addCase(likeVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(shareVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(shareVideo.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        // You can handle success actions for shareVideo here if needed
      })
      .addCase(shareVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
