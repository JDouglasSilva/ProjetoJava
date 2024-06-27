import React from 'react';
import { Box, Button } from '@chakra-ui/react';

const Home = ({ user, logout }) => {
  return (
    <Box>
      <h1>Welcome, {user.username}</h1>
      <Button onClick={logout}>Logout</Button>
    </Box>
  );
};

export default Home;
