import React from 'react';
import { Tr, Td, Button } from '@chakra-ui/react';

const PantryItem = ({ item, strings, openEditItemModal, handleDeleteItem, openHistoryModal }) => {
  return (
    <Tr>
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
  );
};

export default PantryItem;
