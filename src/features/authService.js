import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/user/';

// Verify email
const verifyEmail = async ({ userId, verificationCode }) => {
  try {
    const response = await axios.post(`${API_URL}verify-email`, {
      userId,
      verificationCode,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Verification failed';
  }
};

// Resend verification code
const resendVerificationCode = async (email) => {
  try {
    const response = await axios.post(`${API_URL}reverify`, { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Failed to resend verification code';
  }
};

const register = async (userData) => {
  try {
    const response = await axios.post(API_URL + 'create', userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify({
        ...response.data,
        userId: response.data.userId,
      }));
    }
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error.response?.data || error.message);
    throw error.response?.data || 'Registration failed';
  }
};


// Login user
const login = async (userData) => {
  try {
    const response = await axios.post(API_URL + 'login', userData);

    // console.log('Login response:', response.data);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify({ ...response.data, role: response.data.role }));
    }

    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

// Like a video
// const likeVideo = async ({ userId, contentId }) => {
//   try {
//     const response = await axios.post(API_URL + 'like', { userId, contentId });
//     console.log('Video liked successfully:', response);
//     return response.data;
//   } catch (error) {
//     console.error('Error liking video:', error);
//     throw error;
//   }
// };

// Share video





const authService = {
  register,
  logout,
  login,
  verifyEmail,
  resendVerificationCode,
  // likeVideo,
};

export default authService;
