//"app/front/src/App.jsx"

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import axios from 'axios';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthOutlet from './components/AuthOutlet';
import ProtectedRoute from './components/ProtectedRoute';
import Users from './pages/Users';
import AdminOutlet from './components/AdminOutlet';
import Profile from './pages/Profile';
import UrlShortener from './pages/tools/UrlShortener';
import VirtualPantry from './pages/tools/VirtualPantry';
import { LanguageProvider } from './contexts/LanguageContext';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/users/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error('Failed to fetch user', error);
        }
      };
      fetchUser();
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <LanguageProvider>
      <BrowserRouter>
        <Box>
          <Navbar user={user} logout={logout} />
          <Routes>
            <Route element={<ProtectedRoute user={user} />}>
              <Route path="/home" element={<Home user={user} logout={logout} />} />
              <Route path="/users" element={<Users />} />
              <Route path="/admin/*" element={<AdminOutlet />} />
              <Route path="/profile" element={<Profile user={user} />} />
              <Route path="/tools/url-shortener" element={<UrlShortener />} />
              <Route path="/tools/virtual-pantry" element={<VirtualPantry />} />
            </Route>
            <Route element={<AuthOutlet user={user} />}>
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route path="*" element={<Navigate to={user ? "/home" : "/login"} />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;
