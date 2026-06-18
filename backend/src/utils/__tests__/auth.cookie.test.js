import { describe, it, expect } from 'vitest';
import { request, fazerLogin } from './setup.js';

describe('Autenticação por Cookie', () => {

  // Cookie válido
  it('permite acesso à rota protegida', async () => {
    const cookie = await fazerLogin();

    const resposta = await request
      .get('/api/pacientes/consultas')
      .set('Cookie', cookie);

    expect(resposta.status).toBe(200);
    expect(Array.isArray(resposta.body)).toBe(true);
  });

  // Sem cookie
  it('bloqueia acesso sem cookie', async () => {
    const resposta = await request
      .get('/api/pacientes/consultas');

    expect(resposta.status).toBe(401);
  });

  // Cookie inválido
  it('bloqueia cookie falso', async () => {
    const resposta = await request
      .get('/api/pacientes/consultas')
      .set('Cookie', 'token=falso');

    expect(resposta.status).toBe(401);
  });

  // Header Authorization não deve funcionar
  it('ignora Authorization Bearer', async () => {
    const resposta = await request
      .get('/api/pacientes/consultas')
      .set('Authorization', 'Bearer qualquer');

    expect(resposta.status).toBe(401);
  });

});