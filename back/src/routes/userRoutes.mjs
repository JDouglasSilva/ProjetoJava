//"app/back/src/routes/userRoutes.mjs"

import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.mjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const JWT_SECRET = '1vB$4zM7n@9!B2xE5rU8fT3wQ0#G6lK4'; //Mudar futuramente para o .env
const prisma = new PrismaClient();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/me', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ id: user.id, username: user.username, email: user.email });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
