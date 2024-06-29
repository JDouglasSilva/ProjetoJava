import express from 'express';
import { updateItem, getItemHistory } from '../controllers/itemController.mjs';

const router = express.Router();

router.put('/:id', updateItem); // Rota para editar item
router.get('/:id/history', getItemHistory); // Rota para obter histórico do item

export default router;
