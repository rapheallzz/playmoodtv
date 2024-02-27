// // PrivateRoute.jsx
// import React from 'react';
// import { Navigate, Route, Routes } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const PrivateRoute = ({ element: Element, ...rest }) => {
//   const { user } = useSelector((state) => state.auth);

//   return user ? <Route {...rest} element={<Element />} /> : <Navigate to="/login" replace />;
// };

// export default PrivateRoute;


