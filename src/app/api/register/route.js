// /pages/api/register.js
import User from "@/models/user";
import bcrypt from "bcryptjs";
import connect from "@/utils/db";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    await connect();

    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar novo usuário
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// Exportando opções para NextAuth, se necessário, deve ser feito em um arquivo separado
// /pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import connect from "@/utils/db";

const options = NextAuth({
  providers: [
    CredentialsProvider({
      id: "Credentials",
      name: "Credentials",
      async authorize(credentials) {
        await connect();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const validPassword = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (validPassword) {
              return user;
            } else {
              throw new Error("Invalid credentials");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          throw new Error(error.message);
        }
      }
    })
  ],
  pages: {
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET
});

export { options as GET, options as POST };
