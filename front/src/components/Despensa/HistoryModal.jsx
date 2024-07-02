//"app/front/src/components/despensa/HistoryModal.mjs"

import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text
} from '@chakra-ui/react';
import axios from 'axios';


const HistoryModal = ({ isOpen, onClose, itemId, strings }) => {
  const [history, setHistory] = useState([]);

  // useEffect, usado para com as condições especificas a baixo, fazer algo
  useEffect(() => {
    if (itemId && isOpen) {
      const fetchHistory = async () => {
        try {
          // Obtém o token para ptemitr a busca
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
  }, [itemId, isOpen]); // Refaz a ação sempre que isso mudar

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay /> 
      <ModalContent> 
        <ModalHeader>{strings.pantry.itemHistory}</ModalHeader>
        <ModalCloseButton /> 
        <ModalBody> 
          {history.length > 0 ? (
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>{strings.pantry.date}</Th>
                  <Th>{strings.pantry.change}</Th>
                </Tr>
              </Thead>
              <Tbody> 
                {/* Crria um mapa dos itens a serem exibidos*/} 
                {history.map((entry) => (
                  <Tr key={entry.id}>
                    <Td>{new Date(entry.date).toLocaleString()}</Td>
                    <Td>{entry.change}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            // Se não tem hsitorico exibe a linha a abaixo
            <Text>{strings.pantry.noHistory}</Text>
          )}
        </ModalBody>
        <ModalFooter> 
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default HistoryModal;
