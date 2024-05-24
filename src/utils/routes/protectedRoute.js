import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = () => {
    // Check if tokens exist and are valid. This could be a more sophisticated check.
    const accessToken = localStorage.getItem('accessToken');
    return !!accessToken; // This checks if accessToken is not null or undefined.
  };

  if (!isAuthenticated()) {
    return <Navigate to="/" />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
