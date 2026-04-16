import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
import contentService from './contentService';
import { decodeToken } from '../utils/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_API_URL from '../apiConfig';

const API_URL = `${BASE_API_URL}/api/user/`;

const initialState = {
  user: null,
  userToken: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  contentError: null,
};

// Async thunk to initialize auth state from AsyncStorage
export const initializeAuth = createAsyncThunk('auth/initialize', async (_, thunkAPI) => {
  try {
    const storedUser = await AsyncStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      const user = JSON.parse(storedUser);
      if (user?.token) {
        const decoded = decodeToken(user.token);
        if (!decoded) {
          await AsyncStorage.removeItem('user');
          return null;
        } else {
          user.userId = user.userId || decoded.id || user._id;
          return { user, token: user.token };
        }
      }
    }
    return null;
  } catch (error) {
    await AsyncStorage.removeItem('user');
    return null;
  }
});

// Register user
export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const response = await authService.register(userData);
    if (response && response.userId) {
      const loginData = { email: userData.email, password: userData.password };
      const loginResponse = await thunkAPI.dispatch(login(loginData));
      return loginResponse.payload;
    } else {
      throw new Error(response.message || 'Registration failed: No user ID returned.');
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      'Unable to connect to the server. Please try again later.';
    return thunkAPI.rejectWithValue(message);
  }
});

export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    if (userData.token) {
      const decoded = decodeToken(userData.token);
      if (!decoded) {
        throw new Error('Received expired token');
      }
      const userWithToken = {
        ...userData,
        userId: decoded.id || userData._id,
      };
      await AsyncStorage.setItem('user', JSON.stringify(userWithToken));
      return { user: userWithToken, token: userData.token };
    } else {
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
      return { user: userWithToken, token: response.token };
    }
  } catch (error) {
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      (error.response?.status === 401 ? 'Incorrect login details' : 'Login failed');
    return thunkAPI.rejectWithValue(message);
  }
});

// Like content
export const likeContent = createAsyncThunk('content/likeContent', async ({ contentId }, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.user?.token;
    if (!token) {
      throw new Error('No token found');
    }
    const response = await contentService.likeContent({ contentId, token });
    return response.contentId || contentId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Error liking content');
  }
});

// Unlike content
export const unlikeContent = createAsyncThunk('content/unlikeContent', async ({ contentId }, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.user?.token;
    if (!token) {
      throw new Error('No token found');
    }
    const response = await contentService.unlikeContent({ contentId, token });
    return response.contentId || contentId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Error unliking content');
  }
});

// Add to watchlist
export const addToWatchlist = createAsyncThunk('content/addToWatchlist', async ({ userId, contentId }, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.user?.token;
    if (!token) {
      throw new Error('No token found');
    }
    const response = await contentService.addToWatchlist({ userId, contentId, token });
    return response.contentId || contentId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Error adding to watchlist');
  }
});

// Remove from watchlist
export const removeFromWatchlist = createAsyncThunk('content/removeFromWatchlist', async ({ userId, contentId }, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.user?.token;
    if (!token) {
      throw new Error('No token found');
    }
    const response = await contentService.removeFromWatchlist({ userId, contentId, token });
    return response.contentId || contentId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Error removing from watchlist');
  }
});

// Verify email
export const verifyEmail = createAsyncThunk(
  'auth/verify-email',
  async ({ userId, verificationCode }, thunkAPI) => {
    try {
      const response = await authService.verifyEmail({ userId, verificationCode });
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        'Verification failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Resend verification code
export const resendVerificationCode = createAsyncThunk(
  'auth/reverify',
  async (email, thunkAPI) => {
    try {
      const response = await authService.resendVerificationCode(email);
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        'Failed to resend code';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateAuthUser = createAsyncThunk('auth/updateAuthUser', async (userData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.userToken || userData.token;
    if (!token) {
      throw new Error('No token found');
    }
    const decoded = decodeToken(token);
    if (!decoded) {
      throw new Error('Token expired');
    }
    const response = await authService.updateUser(userData, token);
    const userWithToken = {
      ...response,
      userId: decoded.id || response._id,
      token,
    };
    await AsyncStorage.setItem('user', JSON.stringify(userWithToken));
    return userWithToken;
  } catch (error) {
    if (error.message === 'Token expired') {
      await AsyncStorage.removeItem('user');
      return thunkAPI.rejectWithValue('Token expired, please log in again');
    }
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update user');
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
    logout: (state) => {
      state.user = null;
      state.userToken = null;
    },
    updateAuthUser: (state, action) => {
      const payload = action.payload;
      const decoded = payload.token ? decodeToken(payload.token) : {};
      state.user = {
        ...payload,
        userId: payload.userId || decoded.id || payload._id,
        _id: payload._id || decoded.id || payload.userId,
      };
      state.userToken = payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.user;
          state.userToken = action.payload.token;
        }
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.userToken = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = {
          ...action.payload.user,
          userId: action.payload.user.userId || action.payload.user._id,
          _id: action.payload.user._id || action.payload.user.userId,
        };
        state.userToken = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.userToken = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.userToken = null;
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = '';
      })
      .addCase(updateAuthUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAuthUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = {
          ...action.payload,
          userId: action.payload.userId || action.payload._id,
          _id: action.payload._id || action.payload.userId,
        };
        state.userToken = action.payload.token;
      })
      .addCase(updateAuthUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        if (action.payload === 'Token expired, please log in again') {
          state.user = null;
          state.userToken = null;
        }
      })
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Email verified successfully';
        if (state.user) {
          state.user.verified = true;
        }
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(resendVerificationCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resendVerificationCode.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Verification code resent';
      })
      .addCase(resendVerificationCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(likeContent.fulfilled, (state, action) => {
        if (state.user) {
          const newLikes = [...(state.user.like || []), action.payload];
          state.user = { ...state.user, like: newLikes };
        }
      })
      .addCase(unlikeContent.fulfilled, (state, action) => {
        if (state.user) {
          const newLikes = state.user.like?.filter((id) => id !== action.payload) || [];
          state.user = { ...state.user, like: newLikes };
        }
      })
      .addCase(addToWatchlist.fulfilled, (state, action) => {
        if (state.user && state.user.watchlist) {
          state.user.watchlist.push(action.payload);
        }
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        if (state.user && state.user.watchlist) {
          state.user.watchlist = state.user.watchlist.filter((id) => id !== action.payload);
        }
      })
  },
});

export const { reset, updateAuthUser: updateAuthUserReducer} = authSlice.actions;
export default authSlice.reducer;
