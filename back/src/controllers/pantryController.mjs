//"app/back/src/controllers/pantryController.mjs"

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Criar despensa
export const createPantry = async (req, res) => {
  const { name } = req.body;
  const userId = req.user.userId;

  try {
    // Criar despensa
    const pantry = await prisma.pantry.create({
      data: {
        name,
        userId,
      },
    });

    res.status(201).json(pantry);

  } catch (error) {
    console.error("Error creating pantry:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Obter despensas de um usuário
export const getPantries = async (req, res) => {
  // Obtém o ID do usuário autenticado
  const userId = req.user.userId;

  try {
    // Consulta despensas de um usuario
    const pantries = await prisma.pantry.findMany({ where: { userId } });

    res.status(200).json(pantries);

  } catch (error) {
    console.error("Error fetching pantries:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Obter despensa específica e seus itens
export const getPantry = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    // Consulta SQL para os iotens dentro da despensa
    const pantry = await prisma.pantry.findFirst({
      where: { id: parseInt(id), userId },
      include: { items: true },
    });

    //Despensa não encontrada
    if (!pantry) {
      return res.status(404).json({ error: 'Pantry not found' });
    }

    res.status(200).json(pantry);

  } catch (error) {
    console.error("Error fetching pantry:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Função para atualizar o nome de uma despensa específica(Não implementado)
export const updatePantry = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const userId = req.user.userId;

  try {
    // Atualiza o nome baseado no ID
    const pantry = await prisma.pantry.updateMany({
      where: { id: parseInt(id), userId },
      data: { name },
    });

    if (!pantry.count) {
      return res.status(404).json({ error: 'Pantry not found or not authorized' });
    }

    res.status(200).json({ message: 'Pantry updated successfully' });

  } catch (error) {
    console.error("Error updating pantry:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Deletar despensa
export const deletePantry = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    // Primeiro deleta os hisotricos dos itens dentro da despensa
    await prisma.changeHistory.deleteMany({
      where: { item: { pantryId: parseInt(id) } },
    });

    // Depois deleta os itens da despensa
    await prisma.item.deleteMany({
      where: { pantryId: parseInt(id) },
    });

    // Por ultimo, deleta a despensa
    const pantry = await prisma.pantry.deleteMany({
      where: { id: parseInt(id), userId },
    });

    if (!pantry.count) {
      return res.status(404).json({ error: 'Pantry not found or not authorized' });
    }

    res.status(200).json({ message: 'Pantry deleted successfully' });

  } catch (error) {
    console.error("Error deleting pantry:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
