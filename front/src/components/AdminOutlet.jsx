//"app/front/src/components/AdminOutlet.jsx"

import React from 'react';
import { Outlet } from 'react-router-dom';

{/* Área de administração, ainda não utilizada*/}
const AdminOutlet = () => {
  return (
    <div>
      <h1>Admin Area</h1>
      <Outlet />
    </div>
  );
};

export default AdminOutlet;
