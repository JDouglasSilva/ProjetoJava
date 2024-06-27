import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminOutlet = () => {
  return (
    <div>
      <h1>Admin Area</h1>
      <Outlet />
    </div>
  );
};

export default AdminOutlet;
