import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/user/';

// Register user
const register = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);

    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

// Login user
const login = async (userData) => {
  try {
    const response = await axios.post(API_URL + 'login', userData);

    console.log('Login response:', response.data);

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
const likeVideo = async ({ userId, videoId }) => {
  try {
    const response = await axios.post(API_URL + 'like', { userId, videoId });
    console.log('Video liked successfully:', response);
    return response.data;
  } catch (error) {
    console.error('Error liking video:', error);
    throw error;
  }
};

// Share video
const shareVideo = async ({ userId, videoId, videoUrl }) => {
  try {
    const response = await axios.post(API_URL + 'share', { userId, videoId, videoUrl });
    console.log('Video shared successfully:', response);
    return response.data;
  } catch (error) {
    console.error('Error sharing video:', error);
    throw error;
  }
};

const authService = {
  register,
  logout,
  login,
  likeVideo,
  shareVideo,
};

export default authService;
