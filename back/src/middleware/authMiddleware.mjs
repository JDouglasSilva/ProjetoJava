import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || '1vB$4zM7n@9!B2xE5rU8fT3wQ0#G6lK4'; // Mudar futuramente para o .env

export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
