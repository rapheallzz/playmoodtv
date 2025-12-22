import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { decode as atob } from 'base-64';
import { EXPO_PUBLIC_API_URL } from '../config/apiConfig';

// --- Interfaces ---
interface User {
  _id: string;
  userId: string;
  name: string;
  email: string;
  role: string;
  token: string;
  like: string[];
  watchlist: string[];
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

// --- Helper Functions ---
const decodeToken = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp * 1000 < Date.now()) {
      return null; // Token expired
    }
    return payload;
  } catch (e) {
    return null;
  }
};

// --- Initial State ---
const initialState: AuthState = {
  user: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// --- Async Thunks ---

// Login user
export const login = createAsyncThunk('auth/login', async (userData: any, thunkAPI) => {
  try {
    const response = await axios.post(`${EXPO_PUBLIC_API_URL}/api/users/login`, userData);
    const decoded = decodeToken(response.data.token);
    if (!decoded) {
      throw new Error('Received invalid or expired token');
    }
    const userWithToken: User = {
      ...response.data.user,
      userId: decoded.id || response.data.user._id,
      token: response.data.token,
    };
    await AsyncStorage.setItem('user', JSON.stringify(userWithToken));
    return userWithToken;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || 'Login failed';
    return thunkAPI.rejectWithValue(message);
  }
});

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  await AsyncStorage.removeItem('user');
});

// Like content
export const likeContent = createAsyncThunk('content/like', async ({ contentId }: { contentId: string }, thunkAPI) => {
    const state = thunkAPI.getState() as { auth: AuthState };
    const { user } = state.auth;
    if (!user || !user.token) {
        return thunkAPI.rejectWithValue('User not authenticated');
    }
    try {
        await axios.put(`${EXPO_PUBLIC_API_URL}/api/content/${contentId}/like`, {}, {
            headers: { Authorization: `Bearer ${user.token}` },
        });
        return contentId;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to like content');
    }
});

// Unlike content
export const unlikeContent = createAsyncThunk('content/unlike', async ({ contentId }: { contentId: string }, thunkAPI) => {
    const state = thunkAPI.getState() as { auth: AuthState };
    const { user } = state.auth;
    if (!user || !user.token) {
        return thunkAPI.rejectWithValue('User not authenticated');
    }
    try {
        await axios.put(`${EXPO_PUBLIC_API_URL}/api/content/${contentId}/unlike`, {}, {
            headers: { Authorization: `Bearer ${user.token}` },
        });
        return contentId;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to unlike content');
    }
});

// Add to watchlist
export const addToWatchlist = createAsyncThunk('content/addToWatchlist', async ({ contentId }: { contentId: string }, thunkAPI) => {
    const state = thunkAPI.getState() as { auth: AuthState };
    const { user } = state.auth;
    if (!user || !user.token) {
        return thunkAPI.rejectWithValue('User not authenticated');
    }
    try {
        await axios.post(`${EXPO_PUBLIC_API_URL}/api/content/watchlist/add`, { contentId }, {
            headers: { Authorization: `Bearer ${user.token}` },
        });
        return contentId;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to add to watchlist');
    }
});

// Remove from watchlist
export const removeFromWatchlist = createAsyncThunk('content/removeFromWatchlist', async ({ contentId }: { contentId: string }, thunkAPI) => {
    const state = thunkAPI.getState() as { auth: AuthState };
    const { user } = state.auth;
    if (!user || !user.token) {
        return thunkAPI.rejectWithValue('User not authenticated');
    }
    try {
        await axios.post(`${EXPO_PUBLIC_API_URL}/api/content/watchlist/remove`, { contentId }, {
            headers: { Authorization: `Bearer ${user.token}` },
        });
        return contentId;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to remove from watchlist');
    }
});


// --- Slice ---
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
    setUser: (state, action: PayloadAction<User | null>) => {
        state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
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
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      // Like Content
      .addCase(likeContent.fulfilled, (state, action) => {
          if (state.user) {
              const newLikes = [...state.user.like, action.payload];
              state.user = { ...state.user, like: newLikes };
          }
      })
      // Unlike Content
      .addCase(unlikeContent.fulfilled, (state, action) => {
          if (state.user) {
              const newLikes = state.user.like.filter(id => id !== action.payload);
              state.user = { ...state.user, like: newLikes };
          }
      })
      // Add to Watchlist
      .addCase(addToWatchlist.fulfilled, (state, action) => {
          if (state.user) {
              state.user.watchlist.push(action.payload);
          }
      })
      // Remove from Watchlist
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
          if (state.user) {
              state.user.watchlist = state.user.watchlist.filter(id => id !== action.payload);
          }
      });
  },
});

export const { reset, setUser } = authSlice.actions;
export default authSlice.reducer;
