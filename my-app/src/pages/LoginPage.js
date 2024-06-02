// src/pages/LoginPage.js
import React, { useContext, useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { Box, Button, Input, Text, VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const emailRef = useRef();
  const history = useHistory();
  const toast = useToast();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { email, password });
      login(response.data.token, email);
      history.push('/');
    } catch (err) {
      setError('Invalid email or password');
      toast({
        title: "Error",
        description: "Invalid email or password",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt="10">
      <VStack as="form" spacing="4" onSubmit={handleSubmit}>
        <Input
          ref={emailRef}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" colorScheme="teal" width="full">Login</Button>
      </VStack>
      {error && <Text color="red.500" mt="4">{error}</Text>}
    </Box>
  );
};

export default LoginPage;
