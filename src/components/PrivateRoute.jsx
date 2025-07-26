import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ requiredRole }) => {
  const { user: authUser, userToken } = useSelector((state) => state.auth);

  // Check if user and token exist
  if (!authUser || !userToken) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has the required role (if specified)
  if (requiredRole && authUser.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // Render the protected route's children
  return <Outlet />;
};

export default PrivateRoute;