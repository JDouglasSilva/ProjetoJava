
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

// Rotas
import userRoutes from './src/routes/userRoutes.mjs';
import pantryRoutes from './src/routes/pantryRoutes.mjs';
import itemRoutes from './src/routes/itemRoutes.mjs';


const app = express();
const prisma = new PrismaClient();

// Configuração CORS para permitir tudo
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware verificação, deve vim antes
app.use(express.json());

// Usa as rotas definidas para usuários, despensas e itens
app.use('/api/users', userRoutes);
app.use('/api/pantries', pantryRoutes);
app.use('/api/items', itemRoutes);

// Define a porta do servidor
const PORT = process.env.PORT || 5000;

// Starta o servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
