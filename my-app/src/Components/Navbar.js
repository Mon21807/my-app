// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

const Navbar = () => {
  const { authState, logout } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  return (
    <Flex justifyContent="space-between" p="4" bg="teal.500" color="white">
      {authState.isAuthenticated ? (
        <>
          <Text>{authState.email}</Text>
          <Box>
            <Link to="/"><Button mr="4">Home</Button></Link>
            <Button onClick={handleLogout}>Logout</Button>
          </Box>
        </>
      ) : (
        <Link to="/login"><Button>Login</Button></Link>
      )}
    </Flex>
  );
};

export default Navbar;
