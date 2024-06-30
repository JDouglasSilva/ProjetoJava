//"app/front/src/components/HistoryModal.jsx"


import React, { useEffect, useState } from 'react';
import { Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Table, Thead, Tbody, Tr, Th, Td, useDisclosure, Text } from '@chakra-ui/react';
import axios from 'axios';

const HistoryModal = ({ isOpen, onClose, itemId, strings }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (itemId && isOpen) {
      const fetchHistory = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:5000/api/items/${itemId}/history`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setHistory(response.data);
        } catch (error) {
          console.error("Error fetching item history:", error);
        }
      };

      fetchHistory();
    }
  }, [itemId, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{strings.pantry.itemHistory}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {history.length > 0 ? (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>{strings.pantry.date}</Th>
                  <Th>{strings.pantry.change}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {history.map((entry) => (
                  <Tr key={entry.id}>
                    <Td>{new Date(entry.date).toLocaleString()}</Td>
                    <Td>{entry.change}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Text>{strings.pantry.noHistory}</Text>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>{strings.pantry.close}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default HistoryModal;
