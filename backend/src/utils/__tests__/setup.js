import supertest from 'supertest';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { beforeAll, afterAll } from 'vitest'; 

import authRoutes from '../../routes/authRoutes.js';
import patientRoutes from '../../routes/patientRoutes.js';

dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/pacientes', patientRoutes);

export const request = supertest(app);

export const CREDENCIAIS = {
  username: process.env.TEST_USERNAME || 'admin',
  password: process.env.TEST_PASSWORD || '123456',
};

export const fazerLogin = async () => {
  const resposta = await request
    .post('/api/auth/login')
    .send(CREDENCIAIS);

  if (resposta.status !== 200) {
    throw new Error(
      `Login falhou (${resposta.status}). ` +
      `Verifique TEST_USERNAME e TEST_PASSWORD no .env. ` +
      `Resposta: ${JSON.stringify(resposta.body)}`
    );
  }

  return resposta.headers['set-cookie'];
};


beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
});