import { describe, it, expect } from 'vitest';
import { request } from './setup.js';

describe('Rate Limit', () => {

  // Muitas tentativas de login
  it('bloqueia após várias tentativas', async () => {

    const tentativas = Array.from(
      { length: 11 },
      () =>
        request
          .post('/api/auth/login')
          .send({
            username: 'teste',
            password: 'errada'
          })
    );

    const respostas = await Promise.all(tentativas);

    const status = respostas.map(
      resposta => resposta.status
    );

    expect(status).toContain(429);

  }, 15000);

});