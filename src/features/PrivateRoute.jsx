// In src/components/PrivateRoute.jsx
import { jwtDecode } from 'jwt-decode';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { updateAuthUser, logout } from '../features/authSlice';
import { useEffect } from 'react';

const PrivateRoute = ({ requiredRole }) => {
  const dispatch = useDispatch();
  const { user: authUser, userToken } = useSelector((state) => state.auth);
  console.log('PrivateRoute check:', { authUser, userToken, requiredRole });

  useEffect(() => {
    if (!authUser || !userToken) {
      const cachedUser = JSON.parse(localStorage.getItem('user'));
      if (cachedUser && cachedUser.token) {
        console.log('PrivateRoute: Restoring user from localStorage:', cachedUser);
        try {
          const decoded = jwtDecode(cachedUser.token);
          const currentTime = Date.now() / 1000;
          if (decoded.exp < currentTime) {
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
        } catch (error) {
          console.error('PrivateRoute: Invalid token, clearing localStorage', error);
          localStorage.removeItem('user');
          dispatch(logout());
        }
      }
    } else {
      try {
        const decoded = jwtDecode(userToken);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
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
      } catch (error) {
        console.error('PrivateRoute: Invalid token for authUser, clearing localStorage', error);
        localStorage.removeItem('user');
        dispatch(logout());
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