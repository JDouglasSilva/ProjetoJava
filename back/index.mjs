//"app/back/index.mjs"

import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import userRoutes from './src/routes/userRoutes.mjs';
import pantryRoutes from './src/routes/pantryRoutes.mjs';
import itemRoutes from './src/routes/itemRoutes.mjs';

const app = express();
const prisma = new PrismaClient();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json()); // Middleware para parsing de JSON deve vir antes das rotas

app.use('/api/users', userRoutes);
app.use('/api/pantries', pantryRoutes);
app.use('/api/items', itemRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});