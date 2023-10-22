import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminContext } from '../contexts/adminContext';

const PrivateRoute = ({ children }) => {
  const { admin } = useAdminContext();
  return admin ? children : <Navigate to='/login' />;
};
export default PrivateRoute;
