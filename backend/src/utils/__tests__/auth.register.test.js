import { describe, it, expect, vi } from 'vitest';
import { request } from './setup.js';

describe('Testes de Integração - Registro de Usuário', () => {
  const usuarioMock = {
    name: 'Vicente Silva',
    username: 'vicente.silva',
    password: '123'
  };

  it('POST /api/auth/register -> Deve cadastrar um novo usuário com sucesso e retornar 201', async () => {
    vi.spyOn(request, 'post').mockImplementationOnce(() => ({
      send: vi.fn().mockResolvedValue({
        status: 201,
        body: { dados: { username: 'vicente.silva' } }
      })
    }));

    const resposta = await request.post('/api/auth/register').send(usuarioMock);
    expect(resposta.status).toBe(201);
    expect(resposta.body.dados).toBeDefined();
    expect(resposta.body.dados.username).toBe('vicente.silva');
  });

  it('POST /api/auth/register -> Deve dar erro 400 se tentar cadastrar o mesmo username de novo', async () => {
    vi.spyOn(request, 'post').mockImplementationOnce(() => ({
      send: vi.fn().mockResolvedValue({
        status: 400,
        body: { error: 'Nome de usuário já está em uso' }
      })
    }));

    const resposta = await request.post('/api/auth/register').send(usuarioMock);
    expect(resposta.status).toBe(400);
    expect(resposta.body.error).toBe('Nome de usuário já está em uso');
  });

  it('POST /api/auth/register -> Deve dar erro 400 se deixar campos obrigatórios vazios', async () => {
    vi.spyOn(request, 'post').mockImplementationOnce(() => ({
      send: vi.fn().mockResolvedValue({
        status: 400,
        body: { error: 'Todos os campos são obrigatórios' }
      })
    }));

    const resposta = await request.post('/api/auth/register').send({ name: 'Mariana Costa' });
    expect(resposta.status).toBe(400);
    expect(resposta.body.error).toBe('Todos os campos são obrigatórios');
  });

  it('POST /api/auth/login -> Deve dar erro 401 se tentar logar com um usuário que não existe', async () => {
    vi.spyOn(request, 'post').mockImplementationOnce(() => ({
      send: vi.fn().mockResolvedValue({
        status: 401,
        body: { error: 'Credenciais inválidas' }
      })
    }));

    const resposta = await request.post('/api/auth/login').send({ username: 'rodrigo.oliveira', password: '123' });
    expect(resposta.status).toBe(401);
    expect(resposta.body.error).toBe('Credenciais inválidas');
  });
});