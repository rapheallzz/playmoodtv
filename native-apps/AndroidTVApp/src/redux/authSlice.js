import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authService from '../services/authService';

const setUserInStorage = async (user) => {
  try {
    const jsonValue = JSON.stringify(user);
    await AsyncStorage.setItem('@user', jsonValue);
  } catch (e) {
    console.error("Failed to save user to storage", e);
  }
};

const removeUserFromStorage = async () => {
  try {
    await AsyncStorage.removeItem('@user');
  } catch(e) {
    console.error("Failed to remove user from storage", e);
  }
};

export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, thunkAPI) => {
    try {
      const response = await authService.register(name, email, password);
      // Assuming registration also returns user data with a token
      setUserInStorage(response.data);
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
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await authService.login(email, password);
      setUserInStorage(data);
      return { user: data };
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

export const logout = createAsyncThunk('auth/logout', async () => {
  await removeUserFromStorage();
});


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, // We will load this async
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  },
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    setUser: (state, action) => {
        state.user = action.payload;
    },
    updateUserLikes: (state, action) => {
        if (state.user) {
            state.user.like = action.payload;
        }
    },
    updateUserWatchlist: (state, action) => {
        if (state.user) {
            state.user.watchlist = action.payload;
        }
    }
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
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset, setUser, updateUserLikes, updateUserWatchlist } = authSlice.actions;
export default authSlice.reducer;
