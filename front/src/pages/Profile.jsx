//"app/front/src/pages/Profile.jsx"

import React, { useContext } from 'react';
import { Box, VStack, Text, Heading } from '@chakra-ui/react';
import { LanguageContext } from '../contexts/LanguageContext';

const Profile = ({ user }) => {
  const { strings } = useContext(LanguageContext);

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <VStack spacing={4}>
        <Heading size="lg">{strings.navbar.profile}</Heading>
        <Text fontSize="lg"><strong>{strings.register.username}:</strong> {user.username}</Text>
        <Text fontSize="lg"><strong>{strings.register.email}:</strong> {user.email}</Text>
      </VStack>
    </Box>
  );
};

export default Profile;
