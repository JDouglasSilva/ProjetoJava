import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Flex, Heading, Link, Spacer, Select } from '@chakra-ui/react';
import { LanguageContext } from '../contexts/LanguageContext';

const Navbar = ({ user, logout }) => {
  const { language, setLanguage, strings } = useContext(LanguageContext);

  return (
    <Box bg="purple.600" px={4} py={2} color="white">
      <Flex alignItems="center" wrap="wrap">
        <Heading size="md">MyApp</Heading>
        <Spacer />
        <Flex alignItems="center" wrap="wrap">
          <Link as={RouterLink} to="/home" px={2} _hover={{ textDecoration: 'none', color: 'purple.200' }}>
            {strings.navbar.home}
          </Link>
          {user && (
            <>
              <Link as={RouterLink} to="/users" px={2} _hover={{ textDecoration: 'none', color: 'purple.200' }}>
                {strings.navbar.users}
              </Link>
              <Button onClick={logout} ml={4} colorScheme="purple" variant="outline" _hover={{ bg: 'purple.700' }}>
                {strings.home.logout}
              </Button>
            </>
          )}
          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            ml={4}
            width="130px"
            bg="purple.600"
            color="white"
            border="none"
            _hover={{ bg: 'purple.700' }}
          >
            <option value="en">English</option>
            <option value="pt">Português</option>
            <option value="es">Español</option>
          </Select>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
