//"app/back/src/controllers/itemController.mjs"

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Adicionar item
export const addItem = async (req, res) => {
  // Recebe os dados da requisição e o ID da despensa
  const { name, currentQuantity, desiredQuantity, lastPurchasePrice } = req.body;
  const { pantryId } = req.params;

  try {
    // Verifica se a despensa existe no banco de dados
    const pantry = await prisma.pantry.findUnique({
      where: { id: parseInt(pantryId) },});

    // Se não, retorna um erro 404
    if (!pantry) {
      return res.status(404).json({ error: 'Pantry not found' });
    }

    // Cria um novo item na despensa
    const item = await prisma.item.create({
      data: {
        pantryId: parseInt(pantryId),
        name,
        currentQuantity,
        desiredQuantity,
        lastPurchasePrice,
      },
    });

    res.status(201).json(item);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Atualizar item
export const updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, currentQuantity, desiredQuantity, lastPurchasePrice } = req.body;

  try {
    // Encontra o item no banco de dados
    const existingItem = await prisma.item.findUnique({ where: { id: parseInt(id) } });

    // Atualiza o item
    const updatedItem = await prisma.item.update({
      where: { id: parseInt(id) },
      data: {
        name,
        currentQuantity,
        desiredQuantity,
        lastPurchasePrice,
      },
    });

    // Calcula a variação do item
    const change = currentQuantity - existingItem.currentQuantity;

    // Adiciona a variação ao histórico de mudanças
    await prisma.changeHistory.create({
      data: {
        itemId: parseInt(id),
        change: change,
        date: new Date(),
      },
    });

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Deletar item
export const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    // Deleta primeiro o histórico do item
    await prisma.changeHistory.deleteMany({
      where: { itemId: parseInt(id) },});

    // Deleta o item
    await prisma.item.delete({
      where: { id: parseInt(id) },});

    res.status(200).json({ message: 'Item deleted successfully' });

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Obter histórico do item
export const getItemHistory = async (req, res) => {
  const { id } = req.params;

  try {
    // Busca todas as mudaçnas realizando uma pesquisa no banco.
    const history = await prisma.changeHistory.findMany({
      where: { itemId: parseInt(id) },
      orderBy: { date: 'desc' },});

    res.status(200).json(history);

  } catch (error) {
    console.error("Error fetching item history:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
