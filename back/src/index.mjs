import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import userRoutes from './routes/userRoutes.mjs';
import pantryRoutes from './routes/pantryRoutes.mjs'; // Adicione essa linha

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/pantries', pantryRoutes); // Adicione essa linha

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
