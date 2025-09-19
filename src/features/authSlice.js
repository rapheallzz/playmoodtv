import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
import contentService from './contentService';
import { decodeToken } from '../utils/auth';
import axios from 'axios';

const API_URL = 'https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/user/';

// Get user from localStorage with validation
let user = null;
try {
  const storedUser = localStorage.getItem('user');
  if (storedUser && storedUser !== 'undefined') {
    user = JSON.parse(storedUser);
    if (user?.token) {
      const decoded = decodeToken(user.token);
      if (!decoded) {
        console.log('authSlice: Token expired on init, clearing localStorage');
        localStorage.removeItem('user');
        user = null;
      } else {
        // Map token's id to userId if not present
        user.userId = user.userId || decoded.id || user._id;
        localStorage.setItem('user', JSON.stringify(user));
      }
    }
  }
} catch (error) {
  console.error('Error parsing user from localStorage:', error);
  localStorage.removeItem('user');
}


const initialState = {
  user: user || null,
  userToken: user?.token || null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  contentError: null,
};

// Register user
export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const response = await authService.register(userData);
    if (response && response.userId) {
      // Automatically log the user in after registration
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
    const response = await authService.login(userData);
    console.log('authSlice login response:', response);
    const decoded = decodeToken(response.token);
    if (!decoded) {
      throw new Error('Received expired token');
    }
    const userWithToken = {
      ...response.user,
      userId: decoded.id || response.user._id,
      token: response.token,
    };
    localStorage.setItem('user', JSON.stringify(userWithToken));
    console.log('authSlice stored in localStorage:', userWithToken);
    return { user: userWithToken, token: response.token };
  } catch (error) {
    console.error('authSlice login error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    const message =
      error.response?.data?.message ||
      (error.response?.status === 401 ? 'Invalid email or password' : 'Login failed');
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
    console.log('authSlice updateAuthUser response:', response);
    const userWithToken = {
      ...response,
      userId: decoded.id || response._id,
      token,
    };
    localStorage.setItem('user', JSON.stringify(userWithToken));
    console.log('authSlice updateAuthUser stored in localStorage:', userWithToken);
    return userWithToken;
  } catch (error) {
    console.error('authSlice updateAuthUser error:', error);
    if (error.message === 'Token expired') {
      localStorage.removeItem('user');
      return thunkAPI.rejectWithValue('Token expired, please log in again');
    }
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update user');
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('user');
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
      localStorage.removeItem('user');
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
          _id: action.payload.user._id || action.payload.user.userId, // Add _id alias
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

      .addCase(likeContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (state.user && state.user.like) {
          state.user.like.push(action.payload);
        }
      })
      .addCase(likeContent.rejected, (state, action) => {
        state.isLoading = false;
        state.contentError = action.payload;
      })
      .addCase(unlikeContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unlikeContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (state.user && state.user.like) {
          state.user.like = state.user.like.filter((id) => id !== action.payload);
        }
      })
      .addCase(unlikeContent.rejected, (state, action) => {
        state.isLoading = false;
        state.contentError = action.payload;
      })
      .addCase(addToWatchlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToWatchlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (state.user && state.user.watchlist) {
          state.user.watchlist.push(action.payload);
        }
      })
      .addCase(addToWatchlist.rejected, (state, action) => {
        state.isLoading = false;
        state.contentError = action.payload;
      })
      .addCase(removeFromWatchlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (state.user && state.user.watchlist) {
          state.user.watchlist = state.user.watchlist.filter((id) => id !== action.payload);
        }
      })
      .addCase(removeFromWatchlist.rejected, (state, action) => {
        state.isLoading = false;
        state.contentError = action.payload;
      })

  },
});

export const { reset, updateAuthUser: updateAuthUserReducer} = authSlice.actions;
export default authSlice.reducer;
