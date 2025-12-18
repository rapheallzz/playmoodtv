import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_API_URL from '../apiConfig';

const API_URL = `${BASE_API_URL}/users/`;

const getUserFromStorage = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Failed to fetch user from storage', error);
    return null;
  }
};

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
      const response = await axios.post(API_URL, user);
      if (response.data) {
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      const message = (error.response?.data?.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  });

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    const response = await axios.post(API_URL + 'login', user);
    if (response.data) {
      await AsyncStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    const message = (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await AsyncStorage.removeItem('user');
});

export const likeContent = createAsyncThunk('auth/like', async ({ contentId }, thunkAPI) => {
    const { auth } = thunkAPI.getState();
    try {
      await axios.put(`${BASE_API_URL}/content/${contentId}/like`, {}, {
        headers: { Authorization: `Bearer ${auth.user.token}` }
      });
      return contentId;
    } catch (error) {
      const message = (error.response?.data?.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  });

  export const unlikeContent = createAsyncThunk('auth/unlike', async ({ contentId }, thunkAPI) => {
    const { auth } = thunkAPI.getState();
    try {
      await axios.put(`${BASE_API_URL}/content/${contentId}/unlike`, {}, {
        headers: { Authorization: `Bearer ${auth.user.token}` }
      });
      return contentId;
    } catch (error) {
      const message = (error.response?.data?.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  });

  export const addToWatchlist = createAsyncThunk('auth/addToWatchlist', async ({ contentId }, thunkAPI) => {
    const { auth } = thunkAPI.getState();
    try {
        await axios.post(`${BASE_API_URL}/content/watchlist/add`, { contentId }, {
            headers: { Authorization: `Bearer ${auth.user.token}` }
        });
        return contentId;
    } catch (error) {
      const message = (error.response?.data?.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  });

  export const removeFromWatchlist = createAsyncThunk('auth/removeFromWatchlist', async ({ contentId }, thunkAPI) => {
    const { auth } = thunkAPI.getState();
    try {
        await axios.post(`${BASE_API_URL}/content/watchlist/remove`, { contentId }, {
            headers: { Authorization: `Bearer ${auth.user.token}` }
        });
        return contentId;
    } catch (error) {
      const message = (error.response?.data?.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
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
    setUser: (state, action) => {
        state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => { state.isLoading = true; })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false; state.isSuccess = true; state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false; state.isError = true; state.message = action.payload; state.user = null;
      })
      .addCase(login.pending, (state) => { state.isLoading = true; })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false; state.isSuccess = true; state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false; state.isError = true; state.message = action.payload; state.user = null;
      })
      .addCase(logout.fulfilled, (state) => { state.user = null; })
      .addCase(likeContent.fulfilled, (state, action) => {
          if(state.user) state.user.like.push(action.payload);
      })
      .addCase(unlikeContent.fulfilled, (state, action) => {
          if(state.user) state.user.like = state.user.like.filter(id => id !== action.payload);
      })
      .addCase(addToWatchlist.fulfilled, (state, action) => {
        if(state.user) state.user.watchlist.push(action.payload);
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        if(state.user) state.user.watchlist = state.user.watchlist.filter(id => id !== action.payload);
      });
  },
});

export const { reset, setUser } = authSlice.actions;

export const loadUserFromStorage = () => async (dispatch) => {
    const user = await getUserFromStorage();
    dispatch(setUser(user));
};

export default authSlice.reducer;
