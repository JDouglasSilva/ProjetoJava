import React, { useContext } from 'react';
import { Box, Button, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';
import { tools } from '../config/tools';

const Home = () => {
  const { strings } = useContext(LanguageContext);

  return (
    <Box maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <VStack spacing={4}>
        <Text fontSize="2xl">{strings.home.welcome.replace("{username}", "User")}</Text>
        <SimpleGrid columns={[1, 2]} spacing={4} mt={4}>
          {tools.map((tool, index) => (
            <Button
              key={index}
              as={RouterLink}
              to={tool.path}
              colorScheme="purple"
              size="lg"
              width="full"
            >
              {strings.home.functionalities[tool.name]}
            </Button>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default Home;
