import React, { useContext, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Flex, Heading, Link, Spacer, Select, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { LanguageContext } from '../contexts/LanguageContext';

const Navbar = ({ user, logout }) => {
  const { language, setLanguage, strings } = useContext(LanguageContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

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
              <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
                <MenuButton onClick={handleMenuToggle} as={Button} ml={4} colorScheme="purple" variant="outline" _hover={{ bg: 'purple.700', color: 'white' }} _focus={{ boxShadow: 'none' }} color="white">
                  {user.username}
                </MenuButton>
                <MenuList bg="white" color="black">
                  <MenuItem as={RouterLink} to="/profile">{strings.navbar.profile}</MenuItem>
                  <MenuItem onClick={logout}>{strings.navbar.logout}</MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            ml={4}
            width="130px"
            bg="white"
            color="black"
            border="none"
            _hover={{ bg: 'gray.100' }}
            _focus={{ bg: 'gray.100' }}
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
