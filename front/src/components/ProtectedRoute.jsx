//"app/front/src/components/ProtectedRoute.jsx"

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Define o componente ProtectedRoute
const ProtectedRoute = ({ user }) => {
  // Se o usuário estiver autenticado, renderiza as rotas aninhadas
  // Caso contrário, redireciona para a página de login
  return user ? <Outlet /> : <Navigate to="/login" />;
};

// Exporta o componente ProtectedRoute
export default ProtectedRoute;
