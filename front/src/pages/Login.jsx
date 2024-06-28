//"app/front/src/pages/Login.jsx"

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Box, Button, Input, VStack, Text, FormControl, FormLabel } from '@chakra-ui/react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { strings } = useContext(LanguageContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      navigate('/home');
    } catch (error) {
      setError(strings.login.error);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="email" isInvalid={!!error}>
            <FormLabel>{strings.login.email}</FormLabel>
            <Input
              type="email"
              placeholder={strings.login.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isInvalid={!!error}>
            <FormLabel>{strings.login.password}</FormLabel>
            <Input
              type="password"
              placeholder={strings.login.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="purple" width="full">
            {strings.login.submit}
          </Button>
          {error && <Text fontSize="sm" color="red.500">{error}</Text>}
          <Button as={RouterLink} to="/register" colorScheme="blue" width="full" mt={2}>
            {strings.login.createAccount}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
