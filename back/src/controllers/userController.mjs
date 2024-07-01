//"app/back/src/controllers/userController.mjs"

// Prisma Banco de dados
import { PrismaClient } from '@prisma/client';
// bcrypt para hash de senhas
import bcrypt from 'bcrypt';
// jwt para tokens JWT
import jwt from 'jsonwebtoken';


const prisma = new PrismaClient();

// Chave secreta para o JWT (Mudar futuramente para o .env)
const JWT_SECRET = '1vB$4zM7n@9!B2xE5rU8fT3wQ0#G6lK4';

// Novo usuário
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Validação de campos obrigatórios
  //(A verificação no front ja existe, essa esta aqui para acessos diretos a API)
  if (!username || !email || !password) {
    return res.status(400).json({ errors: [{ field: 'general', message: 'All fields are required' }] });
  }

  // Hash da senha do usuário
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Consulta se o usuário ou e-mail já existem
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }]
      }
    });

    const errors = [];

    // Adiciona erros se o usuário ou e-mail já existirem
    //(A verificação no front ja existe, essa esta aqui para acessos diretos a API)
    if (existingUser) {
      if (existingUser.username === username) {
        errors.push({ field: 'username', message: 'Username already exists' });
      }
      if (existingUser.email === email) {
        errors.push({ field: 'email', message: 'Email already exists' });
      }
      return res.status(400).json({ errors });
    }

    // Novo usuário no banco de dados
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    res.status(500).json({ errors: [{ field: 'general', message: 'Internal server error' }] });
  }
};

// Autenticar e logar usuario
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Obtem usuário pelo e-mail
    const user = await prisma.user.findUnique({ where: { email } });

    // Verifica as credenciais do usuário
    if (user && (await bcrypt.compare(password, user.password))) {
      // Cria um token JWT se as credenciais forem válidas
      const token = jwt.sign(
        // Informações passadas no token
        { userId: user.id, username: user.username },
        // Chave secreta do token
        JWT_SECRET,
        // Duração do token
        { expiresIn: '1h' }
      );

      // Retorna o token e os dados do usuário
      res.json({ token, user: { id: user.id, username: user.username, email: user.email } });

    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Recuperar os dados do usuário autenticado
export const getUser = async (req, res) => {
  try {
    // Consulta o usuário pelo ID presente no token JWT
    const user = await prisma.user.findUnique({ where: { id: req.user.userId } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ id: user.id, username: user.username, email: user.email });

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
