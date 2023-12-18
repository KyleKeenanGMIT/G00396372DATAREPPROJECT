import React from 'react';
import { Navigate } from 'react-router-dom';//navigate import to redirect user.

const PrivateRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;//if the user has logged in > send to home page.
};

export default PrivateRoute;//private routing is being used to block the user for accessing pages before logging in properly.
