import axios from 'axios';
import API_URL from '../config/apiConfig';

const login = async (userData: any) => {
  const response = await axios.post(`${API_URL}/api/users/login`, userData);
  return response.data;
};

const register = async (userData: any) => {
    const response = await axios.post(`${API_URL}/api/users/register`, userData);
    return response.data;
};

const authService = {
  login,
  register,
};

export default authService;
