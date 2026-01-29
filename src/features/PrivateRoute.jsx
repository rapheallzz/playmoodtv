// In src/components/PrivateRoute.jsx
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { updateAuthUser, logout } from '../features/authSlice';
import { useEffect } from 'react';
import { decodeToken } from '../utils/auth';

const PrivateRoute = ({ requiredRole }) => {
  const dispatch = useDispatch();
  const { user: authUser, userToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!authUser || !userToken) {
      const cachedUser = JSON.parse(localStorage.getItem('user'));
      if (cachedUser && cachedUser.token) {
        const decoded = decodeToken(cachedUser.token);
        if (!decoded) {
          localStorage.removeItem('user');
          dispatch(logout());
          return;
        }
        const updatedUser = {
          ...cachedUser,
          userId: cachedUser.userId || decoded.id || cachedUser._id,
        };
        dispatch(updateAuthUser(updatedUser));
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } else {
      const decoded = decodeToken(userToken);
      if (!decoded) {
        localStorage.removeItem('user');
        dispatch(logout());
      } else if (!authUser.userId) {
        // Ensure userId is set
        const updatedUser = {
          ...authUser,
          userId: decoded.id || authUser._id,
        };
        dispatch(updateAuthUser(updatedUser));
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    }
  }, [authUser, userToken, dispatch]);

  const token = userToken || JSON.parse(localStorage.getItem('user'))?.token;

  if (!authUser || !token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && authUser.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
