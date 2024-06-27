import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthOutlet = ({ user }) => {
  return user ? <Navigate to="/home" /> : <Outlet />;
};

export default AuthOutlet;
