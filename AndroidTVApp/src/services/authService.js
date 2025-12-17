import axios from 'axios';
import BASE_API_URL from '../apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = `${BASE_API_URL}/api/users`;

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  if (response.data) {
    await AsyncStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async () => {
  await AsyncStorage.removeItem('user');
};

const authService = {
  login,
  logout,
};

export default authService;
