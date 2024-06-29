import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, VStack, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, useToast } from '@chakra-ui/react';
import { LanguageContext } from '../contexts/LanguageContext';
import HistoryModal from '../components/HistoryModal';

const PantryDetails = () => {
  const { strings } = useContext(LanguageContext);
  const { id } = useParams();
  const [pantry, setPantry] = useState(null);
  const [itemName, setItemName] = useState('');
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const [desiredQuantity, setDesiredQuantity] = useState(0);
  const [lastPurchasePrice, setLastPurchasePrice] = useState(0.0);
  const [editingItem, setEditingItem] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isHistoryOpen, onOpen: onHistoryOpen, onClose: onHistoryClose } = useDisclosure();
  const [historyItemId, setHistoryItemId] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchPantry = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/pantries/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPantry(response.data);
    };

    fetchPantry();
  }, [id]);

  const openAddItemModal = () => {
    setEditingItem(null);
    setItemName('');
    setCurrentQuantity(0);
    setDesiredQuantity(0);
    setLastPurchasePrice(0.0);
    onOpen();
  };

  const openEditItemModal = (item) => {
    setEditingItem(item);
    setItemName(item.name);
    setCurrentQuantity(item.currentQuantity);
    setDesiredQuantity(item.desiredQuantity);
    setLastPurchasePrice(item.lastPurchasePrice);
    onOpen();
  };

  const handleDeleteItem = async (itemId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/pantries/items/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPantry({
        ...pantry,
        items: pantry.items.filter(item => item.id !== itemId)
      });
      toast({
        title: strings.pantry.deleteItem,
        description: strings.pantry.deletedSuccessfully,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting item:", error);
      toast({
        title: strings.pantry.deleteItem,
        description: strings.pantry.deleteFailed,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleAddOrEditItem = async () => {
    const token = localStorage.getItem('token');
    const data = {
      name: itemName,
      currentQuantity: parseInt(currentQuantity),
      desiredQuantity: parseInt(desiredQuantity),
      lastPurchasePrice: parseFloat(lastPurchasePrice)
    };

    try {
      let updatedPantry;
      if (editingItem) {
        await axios.put(`http://localhost:5000/api/items/${editingItem.id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        updatedPantry = {
          ...pantry,
          items: pantry.items.map(item => item.id === editingItem.id ? { ...item, ...data } : item)
        };
      } else {
        const response = await axios.post(`http://localhost:5000/api/pantries/${id}/items`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        updatedPantry = {
          ...pantry,
          items: [...(pantry.items || []), response.data]
        };
      }
      setPantry(updatedPantry);
      onClose();
      setItemName('');
      setCurrentQuantity(0);
      setDesiredQuantity(0);
      setLastPurchasePrice(0.0);
      setEditingItem(null);
      toast({
        title: editingItem ? strings.pantry.editItem : strings.pantry.addItem,
        description: editingItem ? strings.pantry.editedSuccessfully : strings.pantry.addedSuccessfully,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding or editing item:", error);
      toast({
        title: editingItem ? strings.pantry.editItem : strings.pantry.addItem,
        description: editingItem ? strings.pantry.editFailed : strings.pantry.addFailed,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const openHistoryModal = (itemId) => {
    setHistoryItemId(itemId);
    onHistoryOpen();
  };

  if (!pantry) {
    return <Text>{strings.pantry.loading}</Text>;
  }

  return (
    <Box>
      <VStack>
        <Text fontSize="2xl" fontWeight="bold">{pantry.name}</Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>{strings.pantry.itemName}</Th>
              <Th>{strings.pantry.currentQuantity}</Th>
              <Th>{strings.pantry.desiredQuantity}</Th>
              <Th>{strings.pantry.lastPurchasePrice}</Th>
              <Th>{strings.pantry.actions}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pantry.items?.map((item) => (
              <Tr key={item.id}>
                <Td>{item.name}</Td>
                <Td>{item.currentQuantity}</Td>
                <Td>{item.desiredQuantity}</Td>
                <Td>{item.lastPurchasePrice}</Td>
                <Td>
                  <Button size="sm" colorScheme="blue" mr="2" onClick={() => openEditItemModal(item)}>{strings.pantry.editItem}</Button>
                  <Button size="sm" colorScheme="red" mr="2" onClick={() => handleDeleteItem(item.id)}>{strings.pantry.deleteItem}</Button>
                  <Button size="sm" colorScheme="purple" onClick={() => openHistoryModal(item.id)}>{strings.pantry.viewHistory}</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Button mt="4" colorScheme="teal" onClick={openAddItemModal}>{strings.pantry.addItem}</Button>
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
                onChange={(e) => setCurrentQuantity(parseInt(e.target.value))}
              />
              <Input
                placeholder={strings.pantry.desiredQuantity}
                type="number"
                value={desiredQuantity}
                onChange={(e) => setDesiredQuantity(parseInt(e.target.value))}
              />
              <Input
                placeholder={strings.pantry.lastPurchasePrice}
                type="number"
                value={lastPurchasePrice}
                onChange={(e) => setLastPurchasePrice(parseFloat(e.target.value))}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddOrEditItem}>
              {strings.pantry.saveItem}
            </Button>
            <Button variant="ghost" onClick={onClose}>{strings.pantry.close}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={onHistoryClose}
        itemId={historyItemId}
        strings={strings}
      />
    </Box>
  );
};

export default PantryDetails;
