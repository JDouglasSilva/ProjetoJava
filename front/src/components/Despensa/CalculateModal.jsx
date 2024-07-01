import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';

const CalculateModal = ({ isOpen, onClose, calcItems, strings }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{strings.pantry.calculatePurchase}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>{strings.pantry.itemName}</Th>
                <Th>{strings.pantry.quantityToBuy}</Th>
                <Th>{strings.pantry.price}</Th>
                <Th>{strings.pantry.totalPrice}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {calcItems.itemsToBuy?.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.name}</Td>
                  <Td>{item.quantityToBuy}</Td>
                  <Td>{item.price}</Td>
                  <Td>{item.totalPrice}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Text mt={4} fontWeight="bold">{`${strings.pantry.totalToSpend}: ${calcItems.totalPrice}`}</Text>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>{strings.pantry.close}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CalculateModal;
