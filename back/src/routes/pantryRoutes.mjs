//"app/back/src/routes/pantryRoutes.mjs"

import express from 'express';
import { createPantry, getPantries, getPantry, updatePantry, deletePantry } from '../controllers/pantryController.mjs';
import { addItem, updateItem, deleteItem, getItemHistory } from '../controllers/itemController.mjs';
import { authenticateToken } from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.use(authenticateToken);

router.post('/', createPantry);
router.get('/', getPantries);
router.get('/:id', getPantry);
router.put('/:id', updatePantry);
router.delete('/:id', deletePantry);

router.post('/:pantryId/items', addItem);
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);
router.get('/items/:id/history', getItemHistory);

export default router;
