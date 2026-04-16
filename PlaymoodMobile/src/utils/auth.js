import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      return null;
    }
    return decoded;
  } catch (error) {
    return null;
  }
};
