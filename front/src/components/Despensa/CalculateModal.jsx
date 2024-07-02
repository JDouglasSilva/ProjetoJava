//"app/front/src/components/despensa/CalculateModal.mjs"

import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text
} from '@chakra-ui/react';

const CalculateModal = ({ isOpen, onClose, calcItems, strings }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay /> {/* Sobreposição do popup */}
      <ModalContent> {/* Conteúdo do popup */}
        <ModalHeader>{strings.pantry.calculatePurchase}</ModalHeader> {/*Cabeçalho*/}
        <ModalCloseButton />
        <ModalBody> 
          <Table variant="simple"> {/* Pensei em usar "striped", mas fica saindo do popup */}
            <Thead>
              <Tr>
                <Th>{strings.pantry.itemName}</Th>
                <Th>{strings.pantry.quantityToBuy}</Th>
                <Th>{strings.pantry.price}</Th>
                <Th>{strings.pantry.totalPrice}</Th>
              </Tr>
            </Thead>
            <Tbody> 
              {/* Crria um mapa dos itens a serem exibidos*/}
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
          {/* Texto exibindo o preço total a ser gasto */}
          <Text mt={4} fontWeight="bold">{`${strings.pantry.totalToSpend}: ${calcItems.totalPrice}`}</Text>
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CalculateModal;
