
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../server.js'; 

describe('Setup de Integração', () => {
  it('A API deve responder na rota raiz', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});