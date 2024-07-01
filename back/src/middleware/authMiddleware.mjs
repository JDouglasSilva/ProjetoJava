//"app/back/src/middleware/authMiddleware.mjs"

import jwt from 'jsonwebtoken';

// Define a chave secreta para o JWT (Mudar futuramente para o .env)
const JWT_SECRET = process.env.JWT_SECRET || '1vB$4zM7n@9!B2xE5rU8fT3wQ0#G6lK4'; 

// Autenticar o token JWT
export const authenticateToken = (req, res, next) => {
  // Obtém o token do cabeçalho da requisição
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, JWT_SECRET);
    // Adiciona as informações do usuário decodificado à requisição
    req.user = decoded;
    // Passa para o próximo middleware ou rota
    next();

  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
