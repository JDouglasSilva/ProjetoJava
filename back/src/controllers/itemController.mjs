import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addItem = async (req, res) => {
    const { name, currentQuantity, desiredQuantity, lastPurchasePrice } = req.body;
    const { pantryId } = req.params;
  
    try {
      // Verifique se a despensa existe e pertence ao usuário
      const pantry = await prisma.pantry.findUnique({
        where: { id: parseInt(pantryId) },
      });
  
      if (!pantry) {
        return res.status(404).json({ error: 'Pantry not found' });
      }
  
      const item = await prisma.item.create({
        data: {
          pantryId: parseInt(pantryId),
          name,
          currentQuantity,
          desiredQuantity,
          lastPurchasePrice,
        },
      });
  
      await prisma.changeHistory.create({
        data: {
          itemId: item.id,
          quantity: currentQuantity,
        },
      });
  
      res.status(201).json(item);
    } catch (error) {
      console.error(error); // Adicione esta linha para logar o erro no servidor
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  export const updateItem = async (req, res) => {
    const { id } = req.params;
    const { name, currentQuantity, desiredQuantity, lastPurchasePrice } = req.body;
  
    try {
      const existingItem = await prisma.item.findUnique({ where: { id: parseInt(id) } });
  
      const updatedItem = await prisma.item.update({
        where: { id: parseInt(id) },
        data: {
          name,
          currentQuantity,
          desiredQuantity,
          lastPurchasePrice,
        },
      });
  
      const change = currentQuantity - existingItem.currentQuantity;
      
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

export const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.changeHistory.deleteMany({
      where: { itemId: parseInt(id) },
    });
    await prisma.item.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getItemHistory = async (req, res) => {
  const { id } = req.params; // ID do item

  try {
    const history = await prisma.changeHistory.findMany({
      where: { itemId: parseInt(id) },
      orderBy: { date: 'desc' } // Ordenar por data decrescente
    });
    res.status(200).json(history);
  } catch (error) {
    console.error("Error fetching item history:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
