import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';
import { decodeToken } from '../utils/auth';

const AuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    if (token) {
      const decodedUser = decodeToken(token);
      if (decodedUser) {
        const user = {
          ...decodedUser,
          token,
        };
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(login(user));
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [location, navigate, dispatch]);

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
};

export default AuthCallback;
