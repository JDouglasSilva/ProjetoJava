import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.mjs';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = '1vB$4zM7n@9!B2xE5rU8fT3wQ0#G6lK4'; //Mudar Futuramenta para o .env

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/me', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ id: decoded.userId, username: decoded.username });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
