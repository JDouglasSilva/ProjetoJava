//"app/front/src/components/AuthOutlet.jsx"

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthOutlet = ({ user }) => {
  // Se o usuário estiver autenticado vai para home, se não para o loguin
  return user ? <Navigate to="/home" /> : <Outlet />;
};

export default AuthOutlet;
