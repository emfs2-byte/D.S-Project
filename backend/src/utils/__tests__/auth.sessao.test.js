import { describe, it, expect } from 'vitest';
import jwt from 'jsonwebtoken';
import { request } from './setup.js';

describe('Expiração de Sessão', () => {

  // Token expirado
  it('rejeita token expirado', async () => {

    const token = jwt.sign(
      { id: 'teste' },
      process.env.JWT_SECRET,
      { expiresIn: '1ms' }
    );

    await new Promise(resolve =>
      setTimeout(resolve, 10)
    );

    const resposta = await request
      .get('/api/pacientes/consultas')
      .set('Cookie', `token=${token}`);

    expect(resposta.status).toBe(401);
  });

  // Assinatura inválida
  it('rejeita token adulterado', async () => {

    const token = jwt.sign(
      { id: 'invasor' },
      'segredo-falso',
      { expiresIn: '8h' }
    );

    const resposta = await request
      .get('/api/pacientes/consultas')
      .set('Cookie', `token=${token}`);

    expect(resposta.status).toBe(401);
  });

});