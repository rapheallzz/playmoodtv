// In src/components/PrivateRoute.jsx
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { updateAuthUser, logout } from '../features/authSlice';
import { useEffect } from 'react';
import { decodeToken } from '../utils/auth';

const PrivateRoute = ({ requiredRole }) => {
  const dispatch = useDispatch();
  const { user: authUser, userToken } = useSelector((state) => state.auth);
  console.log('PrivateRoute check:', { authUser, userToken, requiredRole });

  useEffect(() => {
    if (!authUser || !userToken) {
      const cachedUser = JSON.parse(localStorage.getItem('user'));
      if (cachedUser && cachedUser.token) {
        console.log('PrivateRoute: Restoring user from localStorage:', cachedUser);
        const decoded = decodeToken(cachedUser.token);
        if (!decoded) {
          console.log('PrivateRoute: Token expired, clearing localStorage and logging out');
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
        console.log('PrivateRoute: Token expired for authUser, clearing localStorage and logging out');
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
  console.log('PrivateRoute token:', token);

  if (!authUser || !token) {
    console.log('PrivateRoute: Redirecting to /login: No user or token');
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && authUser.role !== requiredRole) {
    console.log(`PrivateRoute: Redirecting to /: Role mismatch, expected ${requiredRole}, got ${authUser.role}`);
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
