import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import path from 'path';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

// Configuração das variáveis de ambiente
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

describe('Testes de Integração - API NPI', () => {
  let app;
  let token;

  beforeAll(async () => {
    // Geração de token de autenticação para contornar a validação de JWT
    const payload = { id: 'vance-test-id-123' };
    const secret = process.env.JWT_SECRET || 'test_secret_fallback';
    token = jwt.sign(payload, secret, { expiresIn: '1h' });

    // Importação dinâmica do servidor para assegurar a aplicação do ambiente
    const module = await import('../../server.js');
    app = module.default || module;
  });

  it('A API deve responder na rota raiz', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  it('Deve retornar 400 se o horário for fora do expediente', async () => {
    const response = await request(app)
      .post('/api/pacientes/agendar')
      .set('x-auth-token', token)
      .send({
        paciente: "João Carlos",
        responsavel: "Maria Silva",
        telefone: "81999998888",
        data: "20/05/2026",
        hora: "22:00"
      });
    
    // Validação do status esperado para regras de negócio de horário
    expect(response.status).toBe(400);
  });

  it('Deve retornar 404 para uma rota inexistente', async () => {
    // Valida se a API responde corretamente a caminhos inválidos
    const response = await request(app).get('/api/rota-inexistente');
    expect(response.status).toBe(404);
  });
});