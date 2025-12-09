import axios from 'axios';
import BASE_API_URL from '../apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = `${BASE_API_URL}/api/users/`;

const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}login`, userData);
    const user = {
      userId: response.data._id,
      name: response.data.name,
      email: response.data.email,
      role: response.data.role,
    };
    const token = response.data.token;
    const userWithToken = { ...user, token };
    await AsyncStorage.setItem('user', JSON.stringify(userWithToken));
    return { user, token };
  } catch (error) {
    throw error;
  }
};

const logout = async () => {
  await AsyncStorage.removeItem('user');
};

const authService = {
  login,
  logout,
};

export default authService;
