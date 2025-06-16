import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
import contentService from './contentService';

const API_URL = 'https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/user/';

// Get user from localStorage with validation
let user = null;
try {
  const storedUser = localStorage.getItem('user');
  if (storedUser && storedUser !== 'undefined') {
    user = JSON.parse(storedUser);
  }
} catch (error) {
  console.error('Error parsing user from localStorage:', error);
  localStorage.removeItem('user');
}

const initialState = {
  user: user ? { ...user, role: user.role || 'defaultRole' } : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  contentError: null, // Store content-specific errors
};

// Register user
export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const response = await authService.register(userData);
    const user = {
      userId: response.userId,
      email: userData.email,
      role: response.role || 'defaultRole',
      token: response.token, // Ensure token is stored
    };
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      'Unable to connect to the server. Please try again later.';
    return thunkAPI.rejectWithValue(message);
  }
});

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    const response = await authService.login(user);
    return { ...response, role: response.role || 'defaultRole' };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Login failed');
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

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  await authService.logout();
  thunkAPI.dispatch(reset());
  localStorage.removeItem('user');
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

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
      state.contentError = null;
    },
    updateAuthUser: (state, action) => {
      state.user = action.payload;
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
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Email verified successfully';
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
        state.isSuccess = false;
        state.isError = false;
        state.message = '';
        state.contentError = null;
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
      });
  },
});

export const { reset, updateAuthUser } = authSlice.actions;
export default authSlice.reducer;