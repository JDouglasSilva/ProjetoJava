import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createPantry = async (req, res) => {
  const { name } = req.body;
  const userId = req.user.userId;

  try {
    const pantry = await prisma.pantry.create({
      data: {
        name,
        userId
      }
    });
    res.status(201).json(pantry);
  } catch (error) {
    console.error("Error creating pantry:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPantries = async (req, res) => {
  const userId = req.user.userId;

  try {
    const pantries = await prisma.pantry.findMany({ where: { userId } });
    res.status(200).json(pantries);
  } catch (error) {
    console.error("Error fetching pantries:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPantry = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const pantry = await prisma.pantry.findFirst({
      where: { id: parseInt(id), userId },
      include: { items: true } // Incluir itens relacionados
    });
    if (!pantry) {
      return res.status(404).json({ error: 'Pantry not found' });
    }
    res.status(200).json(pantry);
  } catch (error) {
    console.error("Error fetching pantry:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updatePantry = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const userId = req.user.userId;

  try {
    const pantry = await prisma.pantry.updateMany({
      where: { id: parseInt(id), userId },
      data: { name }
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

export const deletePantry = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    // Deletar os históricos de mudanças relacionados aos itens
    await prisma.changeHistory.deleteMany({
      where: { item: { pantryId: parseInt(id) } }
    });

    // Deletar os itens relacionados
    await prisma.item.deleteMany({
      where: { pantryId: parseInt(id) },
    });

    const pantry = await prisma.pantry.deleteMany({
      where: { id: parseInt(id), userId }
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
