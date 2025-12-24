import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { EXPO_PUBLIC_API_URL } from '../config/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
  likes: string[];
  watchlist: string[];
  subscriptions: string[];
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const login = createAsyncThunk('auth/login', async (userData: any, thunkAPI) => {
  try {
    const response = await axios.post(`${EXPO_PUBLIC_API_URL}/api/users/login`, userData);
    if (response.data) {
      await AsyncStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const subscribe = createAsyncThunk('auth/subscribe', async (creatorId: string, thunkAPI) => {
    const { auth }: any = thunkAPI.getState();
    const token = auth.user.token;
    try {
        const response = await axios.post(`${EXPO_PUBLIC_API_URL}/api/subscribe`, { creatorId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const unsubscribe = createAsyncThunk('auth/unsubscribe', async (creatorId: string, thunkAPI) => {
    const { auth }: any = thunkAPI.getState();
    const token = auth.user.token;
    try {
        const response = await axios.put(`${EXPO_PUBLIC_API_URL}/api/subscribe`, { creatorId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(subscribe.fulfilled, (state, action: PayloadAction<any>) => {
        if (state.user) {
          state.user.subscriptions.push(action.payload.creatorId);
        }
      })
      .addCase(unsubscribe.fulfilled, (state, action: PayloadAction<any>) => {
        if (state.user) {
          state.user.subscriptions = state.user.subscriptions.filter(
            (id) => id !== action.payload.creatorId
          );
        }
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;