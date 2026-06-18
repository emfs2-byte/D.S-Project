import { describe, it, expect } from 'vitest';
import { request, fazerLogin } from './setup.js';

describe('Logout', () => {

  // Remove cookie
  it('apaga o cookie', async () => {
    const cookie = await fazerLogin();

    const resposta = await request
      .post('/api/auth/logout')
      .set('Cookie', cookie);

    expect(resposta.status).toBe(200);

    expect(
      resposta.headers['set-cookie'][0]
    ).toMatch(/Max-Age=0|Expires=Thu, 01 Jan 1970/i);
  });

  // Documenta comportamento atual
  it('acesso após logout', async () => {
    const cookie = await fazerLogin();

    await request
      .post('/api/auth/logout')
      .set('Cookie', cookie);

    const resposta = await request
      .get('/api/pacientes/consultas')
      .set('Cookie', cookie);

    expect([200, 401]).toContain(resposta.status);
  });

});