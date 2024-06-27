import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Flex, Heading, Link, Spacer } from '@chakra-ui/react';

const Navbar = ({ user, logout }) => {
  return (
    <Box bg="purple.600" px={4} py={2} color="white">
      <Flex alignItems="center">
        <Heading size="md">MyApp</Heading>
        <Spacer />
        <Flex>
          <Link as={RouterLink} to="/home" px={2} _hover={{ textDecoration: 'none', color: 'purple.200' }}>
            Home
          </Link>
          {user && (
            <>
              <Link as={RouterLink} to="/users" px={2} _hover={{ textDecoration: 'none', color: 'purple.200' }}>
                Users
              </Link>
              <Button onClick={logout} ml={4} colorScheme="purple" variant="outline" _hover={{ bg: 'purple.700' }}>
                Logout
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
