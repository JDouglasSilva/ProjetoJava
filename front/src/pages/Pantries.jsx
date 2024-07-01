import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Box, Button, Input, VStack, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, useToast, SimpleGrid } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';

const Pantries = () => {
  const { strings } = useContext(LanguageContext);
  const [pantries, setPantries] = useState([]);
  const [name, setName] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [selectedPantry, setSelectedPantry] = useState(null);
  const [pantryToDelete, setPantryToDelete] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchPantries = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/pantries', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPantries(response.data);
    };

    fetchPantries();
  }, []);

  const handleCreatePantry = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.post('http://localhost:5000/api/pantries', { name }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPantries([...pantries, response.data]);
  };

  const handleDeletePantry = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/pantries/${pantryToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPantries(pantries.filter(pantry => pantry.id !== pantryToDelete.id));
      toast({
        title: strings.pantry.deletePantry,
        description: `${strings.pantry.pantryName} ${pantryToDelete.name} ${strings.pantry.deletedSuccessfully}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onDeleteClose();
    } catch (error) {
      console.error("Error deleting pantry:", error);
      toast({
        title: strings.pantry.deletePantry,
        description: strings.pantry.deleteFailed,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const openDeletePantryModal = (pantry) => {
    setPantryToDelete(pantry);
    onDeleteOpen();
  };

  return (
    <Box>
      <VStack spacing={4}>
        <Input
          placeholder={strings.pantry.pantryName}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={handleCreatePantry}>{strings.pantry.createPantry}</Button>
        <SimpleGrid columns={[1, 2, 3]} spacing={4} mt={4}>
          {pantries.map((pantry) => (
            <Box key={pantry.id} borderWidth="1px" borderRadius="lg" p="4" m="4" boxShadow="md" textAlign="center">
              <Text fontSize="xl" fontWeight="bold" mb="4">{pantry.name}</Text>
              <VStack spacing={2}>
                <Button width="full" colorScheme="teal" as={RouterLink} to={`/pantries/${pantry.id}`}>
                  {strings.pantry.viewPantry}
                </Button>
                <Button width="full" colorScheme="red" size="sm" onClick={() => openDeletePantryModal(pantry)}>
                  {strings.pantry.deletePantry}
                </Button>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>

      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{strings.pantry.deletePantry}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{strings.pantry.deleteConfirmation.replace('{pantryName}', pantryToDelete?.name)}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDeletePantry}>
              {strings.pantry.deletePantry}
            </Button>
            <Button variant="ghost" onClick={onDeleteClose}>{strings.pantry.close}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Pantries;
