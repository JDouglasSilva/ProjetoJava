import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Box, Button, Input, VStack, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, HStack } from '@chakra-ui/react';
import { LanguageContext } from '../../contexts/LanguageContext';

const VirtualPantry = () => {
  const { strings } = useContext(LanguageContext);
  const [pantries, setPantries] = useState([]);
  const [name, setName] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPantry, setSelectedPantry] = useState(null);
  const [itemName, setItemName] = useState('');
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const [desiredQuantity, setDesiredQuantity] = useState(0);
  const [lastPurchasePrice, setLastPurchasePrice] = useState(0.0);
  const [editingItem, setEditingItem] = useState(null);

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

  const handleAddItem = async () => {
    const token = localStorage.getItem('token');
    if (editingItem) {
      await axios.put(`http://localhost:5000/api/pantries/items/${editingItem.id}`, { 
        name: itemName, 
        currentQuantity, 
        desiredQuantity, 
        lastPurchasePrice 
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      await axios.post(`http://localhost:5000/api/pantries/${selectedPantry.id}/items`, { 
        name: itemName, 
        currentQuantity, 
        desiredQuantity, 
        lastPurchasePrice 
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    onClose();
    setItemName('');
    setCurrentQuantity(0);
    setDesiredQuantity(0);
    setLastPurchasePrice(0.0);
    setEditingItem(null);
    // Atualize a lista de itens (isso pode ser feito buscando novamente a despensa ou atualizando localmente)
  };

  const handleDeleteItem = async (itemId) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:5000/api/pantries/items/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Atualize a lista de itens
  };

  const openAddItemModal = (pantry) => {
    setSelectedPantry(pantry);
    onOpen();
  };

  const openEditItemModal = (item) => {
    setItemName(item.name);
    setCurrentQuantity(item.currentQuantity);
    setDesiredQuantity(item.desiredQuantity);
    setLastPurchasePrice(item.lastPurchasePrice);
    setEditingItem(item);
    onOpen();
  };

  return (
    <Box>
      <VStack>
        <Input
          placeholder={strings.pantry.pantryName}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={handleCreatePantry}>{strings.pantry.createPantry}</Button>
        <Box>
          {pantries.map((pantry) => (
            <Box key={pantry.id} borderWidth="1px" borderRadius="lg" p="4" m="4">
              <Text fontSize="xl">{pantry.name}</Text>
              <Button onClick={() => openAddItemModal(pantry)}>{strings.pantry.addItem}</Button>
              <Box mt="4">
                {pantry.items?.map((item) => (
                  <HStack key={item.id} justifyContent="space-between">
                    <Text>{item.name}</Text>
                    <Button size="sm" onClick={() => openEditItemModal(item)}>{strings.pantry.editItem}</Button>
                    <Button size="sm" onClick={() => handleDeleteItem(item.id)}>{strings.pantry.deleteItem}</Button>
                  </HStack>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingItem ? strings.pantry.editItem : strings.pantry.addItem}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Input
                placeholder={strings.pantry.itemName}
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <Input
                placeholder={strings.pantry.currentQuantity}
                type="number"
                value={currentQuantity}
                onChange={(e) => setCurrentQuantity(e.target.value)}
              />
              <Input
                placeholder={strings.pantry.desiredQuantity}
                type="number"
                value={desiredQuantity}
                onChange={(e) => setDesiredQuantity(e.target.value)}
              />
              <Input
                placeholder={strings.pantry.lastPurchasePrice}
                type="number"
                value={lastPurchasePrice}
                onChange={(e) => setLastPurchasePrice(e.target.value)}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddItem}>
              {strings.pantry.saveItem}
            </Button>
            <Button variant="ghost" onClick={onClose}>{strings.pantry.close}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default VirtualPantry;
