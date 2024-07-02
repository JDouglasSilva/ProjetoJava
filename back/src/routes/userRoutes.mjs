//"app/back/src/routes/userRoutes.mjs"

import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.mjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

// Cria um novo roteador Express
const router = express.Router();
// Define a chave secreta para o JWT (Mudar futuramente para o .env)
const JWT_SECRET = '1vB$4zM7n@9!B2xE5rU8fT3wQ0#G6lK4';
// Inicializa o cliente Prisma
const prisma = new PrismaClient();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Define uma rota GET para obter os dados do usuário autenticado(Estudar mais depois)
router.get('/me', async (req, res) => {
  // Obtém o token do cabeçalho da requisição
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Encontra o usuário pelo ID
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Retorna os dados do usuário
    res.json({ id: user.id, username: user.username, email: user.email });

  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});
export default router;

