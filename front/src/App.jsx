import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Box>
        {user ? (
          <Box>
            <h1>Welcome, {user.username}</h1>
          </Box>
        ) : (
          <Routes>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        )}
      </Box>
    </Router>
  );
};

export default App;
