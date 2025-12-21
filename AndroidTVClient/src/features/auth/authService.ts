import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_API_URL from '../../config/apiConfig';

const API_URL = `${BASE_API_URL}/api/users`;

// Register user
const register = async (userData: any) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  if (response.data) {
    await AsyncStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
const login = async (userData: any) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  if (response.data) {
    await AsyncStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Logout user
const logout = async () => {
  await AsyncStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
