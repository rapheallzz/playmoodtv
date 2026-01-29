import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import BASE_API_URL from '../apiConfig';


const API_URL = `${BASE_API_URL}/api/users/`;



const verifyEmail = async ({ userId, verificationCode }) => {
  try {
    const response = await axios.post(`${API_URL}verify-email`, {
      userId,
      verificationCode,
    });
    return response.data; // Expecting { message: "Email verified successfully" }
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Verification failed'
    );
  }
};

const resendVerificationCode = async (email) => {
  try {
    const response = await axios.post(`${API_URL}reverify`, { email });
    return response.data; // Expecting { message: "Verification code resent" }
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to resend code'
    );
  }
};


const register = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Registration failed';
  }
};



// Login user
const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}login`, userData);
    const user = {
      userId: response.data._id,
      name: response.data.name,
      email: response.data.email,
      role: response.data.role,
      profileImage: response.data.profileImage,
      cloudinary_id: response.data.cloudinary_id,
      likes: response.data.likes,
      watchlist: response.data.watchlist,
      history: response.data.history,
      verified: response.data.verified,
      hasReadPrivacyPolicy: response.data.hasReadPrivacyPolicy,
    };
    const token = response.data.token;
    const userWithToken = { ...user, token };
    localStorage.setItem('user', JSON.stringify(userWithToken));
    return { user, token };
  } catch (error) {
    throw error;
  }
};

const updateUser = async (userData, token) => {
  if (!token) {
    throw new Error('No token provided');
  }
  const userId = userData.userId || userData._id;
  if (!userId) {
    throw new Error('No userId provided');
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': userData instanceof FormData ? 'multipart/form-data' : 'application/json',
    },
  };
  try {
    const response = await axios.put(`${API_URL}${userId}`, userData, config);
    return { ...response.data.user, userId: response.data.user._id };
  } catch (error) {
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
//
//     return response.data;
//   } catch (error) {
//
//     throw error;
//   }
// };

// Share video

const changePassword = async ({ currentPassword, newPassword, token }) => {
  if (!token) {
    throw new Error('No token provided');
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.post(
      `${API_URL}change-password`,
      { currentPassword, newPassword },
      config
    );
    return response.data;
  } catch (error) {
    const message = error.response?.data?.details || error.response?.data?.message || 'Password change failed';
    throw new Error(message);
  }
};



const authService = {
  register,
  logout,
  login,
  verifyEmail,
  resendVerificationCode,
  updateUser,
  changePassword,
  // likeVideo,
};

export default authService;