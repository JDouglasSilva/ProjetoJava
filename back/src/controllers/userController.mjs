import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = '1vB$4zM7n@9!B2xE5rU8fT3wQ0#G6lK4'; //Mudar Futuramenta para o .env

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,},});

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error.code === 'P2002' && error.meta.target.includes('username')) {
      res.status(400).json({ error: 'Username already exists' });
    } else if (error.code === 'P2002' && error.meta.target.includes('email')) {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: 'Internal server error' });}}};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    //Se login for confirmado, criação do token
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        //Informações passadas no token
        { userId: user.id, username: user.username }, 
        //Chave do token
        JWT_SECRET, 
        //Duração do token
        { expiresIn: '1h' });

      res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });}
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });}};
