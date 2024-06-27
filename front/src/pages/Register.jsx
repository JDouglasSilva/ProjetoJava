import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Input, VStack, Text, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();
  const { strings, language } = useContext(LanguageContext);

  const validate = () => {
    const errors = {};
    if (!username) errors.username = strings.register.fieldRequired.replace("{field}", strings.register.username);
    if (!email) errors.email = strings.register.fieldRequired.replace("{field}", strings.register.email);
    if (!password) errors.password = strings.register.fieldRequired.replace("{field}", strings.register.password);
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    if (error) {
      const updatedErrors = {};
      Object.keys(fieldErrors).forEach(field => {
        if (fieldErrors[field].includes(strings.register.usernameExists)) {
          updatedErrors.username = strings.register.usernameExists;
        } else if (fieldErrors[field].includes(strings.register.emailExists)) {
          updatedErrors.email = strings.register.emailExists;
        } else {
          updatedErrors[field] = strings.register.fieldRequired.replace("{field}", strings.register[field]);
        }
      });
      setFieldErrors(updatedErrors);
      if (error.includes(strings.register.usernameExists) || error.includes(strings.register.emailExists)) {
        setError(strings.register.error);
      }
    }
  }, [language]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post('http://localhost:5000/api/users/register', { username, email, password });
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        const newFieldErrors = {};
        errors.forEach(err => {
          if (err.field === 'username') {
            newFieldErrors.username = strings.register.usernameExists;
          } else if (err.field === 'email') {
            newFieldErrors.email = strings.register.emailExists;
          } else if (err.field === 'general') {
            setError(err.message);
          }
        });
        setFieldErrors(newFieldErrors);
      } else {
        setError(strings.register.error);
      }
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="username" isInvalid={!!fieldErrors.username}>
            <FormLabel>{strings.register.username}</FormLabel>
            <Input
              type="text"
              placeholder={strings.register.username}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FormErrorMessage>{fieldErrors.username}</FormErrorMessage>
          </FormControl>
          <FormControl id="email" isInvalid={!!fieldErrors.email}>
            <FormLabel>{strings.register.email}</FormLabel>
            <Input
              type="email"
              placeholder={strings.register.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormErrorMessage>{fieldErrors.email}</FormErrorMessage>
          </FormControl>
          <FormControl id="password" isInvalid={!!fieldErrors.password}>
            <FormLabel>{strings.register.password}</FormLabel>
            <Input
              type="password"
              placeholder={strings.register.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormErrorMessage>{fieldErrors.password}</FormErrorMessage>
          </FormControl>
          <Button type="submit" colorScheme="purple" width="full">
            {strings.register.submit}
          </Button>
          {error && <Text fontSize="sm" color="red.500">{error}</Text>}
        </VStack>
      </form>
    </Box>
  );
};

export default Register;
