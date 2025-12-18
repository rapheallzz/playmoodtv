import axios from 'axios';

const API_URL = 'https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/auth/';

const register = (name, email, password) => {
  return axios.post(API_URL + 'register', {
    name,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + 'login', {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        // In a real app, you'd save the token to AsyncStorage here
        // For now, we'll just return the user data
      }
      return response.data;
    });
};

const authService = {
  register,
  login,
};

export default authService;
