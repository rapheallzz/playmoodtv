import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
import contentService from './contentService';

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
export const registerUser = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    const response = await authService.register(user); // Use 'user' directly
    console.log('Registration successful:', response);

    return { ...response.data, role: response.data.role }; // return with role included
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
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

// Like content
export const likeContent = createAsyncThunk('content/likeContent', async ({ userId, contentId }, thunkAPI) => {
  try {
    const response = await contentService.likeContent({ userId, contentId });
    
    console.log('Content liked successfully:', response);
    
    return response.contentId; // Assuming the response contains updated content data
  } catch (error) {
    console.error('Error liking content:', error);
    return thunkAPI.rejectWithValue(error.message || 'Error liking content');
  }
});

// Unlike content
export const unlikeContent = createAsyncThunk('content/unlikeContent', async ({ userId, contentId }, thunkAPI) => {
  try {
    const response = await contentService.unlikeContent({ userId, contentId });
    console.log('Content unliked successfully:', response);
    return response.contentId; // Assuming the response contains updated content data
  } catch (error) {
    console.error('Error unliking content:', error);
    return thunkAPI.rejectWithValue(error.message || 'Error unliking content');
  }
});

// add to watchlist
export const addToWatchlist = createAsyncThunk('content/addToWatchlist', async ({ userId, contentId }, thunkAPI) => {
  try {
    const response = await contentService.addToWatchlist({ userId, contentId });
    console.log(response)
    return response.contentId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Error adding to watchlist');
  }
});

// remove from watchlist
export const removeFromWatchlist = createAsyncThunk('content/removeFromWatchlist', async ({ userId, contentId }, thunkAPI) => {
  try {
    const response = await contentService.removeFromWatchlist({ userId, contentId });
    console.log(response.contentId)
    return response.contentId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Error removing from watchlist');
  }
});



export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  await authService.logout();
  thunkAPI.dispatch(reset()); // Reset all states to initial values
  localStorage.removeItem('user');
});


// Verify email
export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async ({ userId, verificationCode }, thunkAPI) => {
    try {
      return await authService.verifyEmail({ userId, verificationCode });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Verification failed');
    }
  }
);

// Resend verification code
export const resendVerificationCode = createAsyncThunk(
  'auth/resendVerificationCode',
  async (email, thunkAPI) => {
    try {
      return await authService.resendVerificationCode(email);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to resend code');
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
        state.isSuccess = false;
        state.isError = false;
        state.message = '';
    })
      .addCase(likeContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload)
        if (state.user && state.user.like) {
          state.user.like.push(action.payload);
        }
        console.log("likeContent Reducer Working")
      })
      .addCase(likeContent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(unlikeContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unlikeContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload)
        state.user.like = state.user.like.filter(id => id !== action.payload);
      })
      .addCase(unlikeContent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
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
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removeFromWatchlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (state.user && state.user.watchlist) {
          state.user.watchlist = state.user.watchlist.filter(id => id !== action.payload);
        }
      })
      .addCase(removeFromWatchlist.rejected, (state, action) => {
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
      })
      .addCase(resendVerificationCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
  },
});



export const { reset, updateAuthUser } = authSlice.actions;
export default authSlice.reducer;
