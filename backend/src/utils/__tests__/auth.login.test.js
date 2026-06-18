import { describe, it, expect } from 'vitest';
import { request, CREDENCIAIS } from './setup.js';

describe('Login', () => {

  it('retorna cookie HttpOnly', async () => {
    const resposta = await request
      .post('/api/auth/login')
      .send(CREDENCIAIS);

    expect(resposta.status).toBe(200);

    const cookie = resposta.headers['set-cookie'][0];

    expect(cookie).toMatch(/^token=/);
    expect(cookie).toMatch(/HttpOnly/i);
    expect(cookie).toMatch(/SameSite/i);
    expect(cookie).not.toMatch(/;\s*Secure/i);
  });

  it('retorna 401 para login inválido', async () => {
    const resposta = await request
      .post('/api/auth/login')
      .send({
        username: 'usuario_inexistente',
        password: 'senha_errada'
      });

    expect(resposta.status).toBe(401);
    expect(resposta.headers['set-cookie']).toBeUndefined();
  });

  it('não retorna token no body', async () => {
    const resposta = await request
      .post('/api/auth/login')
      .send(CREDENCIAIS);

    expect(resposta.status).toBe(200);

    expect(resposta.body.token).toBeUndefined();
    expect(resposta.body.message)
      .toBe('Login realizado com sucesso');
  });

});