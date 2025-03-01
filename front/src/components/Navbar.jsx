//"app/front/src/components/AuthOutlet.jsx"

// Importa bibliotecas e componentes necessários do React, React Router e Chakra UI
import React, { useContext, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box, Button, Flex, Heading, Link, Spacer, Menu, MenuButton, MenuList, MenuItem, Image
} from '@chakra-ui/react';
import { LanguageContext } from '../contexts/LanguageContext';

const Navbar = ({ user, logout }) => {
  // Usa a linguagem escolhida
  const { language, setLanguage, strings } = useContext(LanguageContext);
  // Estado da barra do usuario
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Função para alternar a abertura do menu do usuário
  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

  // iCONES DE CADA IDIOMA
  const languageIcons = {
    en: '/src/assets/images/eua.png',
    pt: '/src/assets/images/brasil.png',
    es: '/src/assets/images/espanha.png',
  };

  // Arquivos de cada idioma
  const languageLabels = {
    en: 'English',
    pt: 'Português',
    es: 'Español',
  };

  return (
    <Box bg="purple.600" px={4} py={2} color="white">
      <Flex alignItems="center" wrap="wrap">
        <Heading size="md">J.Douglas APP</Heading> {/* Título do aplicativo */}
        <Spacer /> 
        <Flex alignItems="center" wrap="wrap">
          <Link as={RouterLink} to="/home" px={2} _hover={{ textDecoration: 'none', color: 'purple.200' }}>
            {strings.navbar.home} 
          </Link>
          {user && ( // Se o usuário estiver autenticado, mostra links adicionais
            <>
              <Link as={RouterLink} to="/users" px={2} _hover={{ textDecoration: 'none', color: 'purple.200' }}>
                {strings.navbar.users} 
              </Link>
              <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
                <MenuButton
                  onClick={handleMenuToggle}
                  as={Button}
                  ml={4}
                  colorScheme="purple"
                  variant="outline"
                  _hover={{ bg: 'purple.700', color: 'white' }}
                  _focus={{ boxShadow: 'none' }}
                  color="white"
                >
                  {user.username} {/* Botão do menu de usuário */}
                </MenuButton>
                <MenuList bg="white" color="black">
                  <MenuItem as={RouterLink} to="/profile">{strings.navbar.profile}</MenuItem>
                  <MenuItem onClick={logout}>{strings.navbar.logout}</MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
          <Menu>
            <MenuButton as={Button} ml={4} variant="outline" _hover={{ bg: 'purple.700', color: 'white' }} _focus={{ boxShadow: 'none' }}>
              <Image src={languageIcons[language]} alt={languageLabels[language]} boxSize="32px" />
            </MenuButton>
            <MenuList>
              {Object.keys(languageIcons).map((lang) => (
                <MenuItem
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  _hover={{ bg: 'purple.100' }}
                  _focus={{ bg: 'purple.100' }}
                  _active={{ bg: 'purple.200' }}
                  color="black"
                >
                  <Image src={languageIcons[lang]} alt={languageLabels[lang]} boxSize="32px" mr={2} />
                  {languageLabels[lang]} {/* Texto do idioma */}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
