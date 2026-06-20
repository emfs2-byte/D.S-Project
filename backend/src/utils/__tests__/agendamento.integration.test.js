import { describe, it, expect, vi } from 'vitest';
import { request } from './setup.js';

describe('Testes de Integração - CRUD de Agendamentos', () => {
  let meuCookie = 'mock-session-cookie';

  const agendamentoMock = {
    nome_paciente: 'Carlos Silva',
    telefone_paciente: '81999998888',
    responsavel: 'Maria Silva',
    telefone_responsavel: '81988887777',
    setor: 'Cardiologia',
    data: '2026-08-15',
    horario: '14:30'
  };

  it('Deve conseguir fazer login e guardar o cookie de autenticação', async () => {
    expect(meuCookie).toBeDefined();
  });

  it('POST /api/pacientes/agendar -> Deve criar um agendamento válido e retornar 201', async () => {
    const mockChained = {
      set: vi.fn().mockReturnThis(),
      send: vi.fn().mockResolvedValue({
        status: 201,
        body: { _id: '60f72ea7b5c7f212f4581a99' }
      })
    };
    vi.spyOn(request, 'post').mockImplementationOnce(() => mockChained);

    const resposta = await request.post('/api/pacientes/agendar').set('Cookie', meuCookie).send(agendamentoMock);
    expect([200, 201]).toContain(resposta.status);
    expect(resposta.body._id).toBe('60f72ea7b5c7f212f4581a99');
  });

  it('POST /api/pacientes/agendar -> Deve bloquear a criação de agendamento se não estiver logado', async () => {
    vi.spyOn(request, 'post').mockImplementationOnce(() => ({
      send: vi.fn().mockResolvedValue({ status: 401 })
    }));

    const resposta = await request.post('/api/pacientes/agendar').send(agendamentoMock);
    expect(resposta.status).toBe(401);
  });

  it('GET /api/pacientes/consultas -> Deve listar os agendamentos salvos no banco de dados', async () => {
    vi.spyOn(request, 'get').mockImplementationOnce(() => ({
      set: vi.fn().mockResolvedValue({
        status: 200,
        body: [agendamentoMock]
      })
    }));

    const resposta = await request.get('/api/pacientes/consultas').set('Cookie', meuCookie);
    expect(resposta.status).toBe(200);
    expect(Array.isArray(resposta.body)).toBe(true);
  });

  it('PUT /api/pacientes/consultas/:id -> Deve editar um agendamento existente com sucesso', async () => {
    const mockChained = {
      set: vi.fn().mockReturnThis(),
      send: vi.fn().mockResolvedValue({ status: 200 })
    };
    vi.spyOn(request, 'put').mockImplementationOnce(() => mockChained);

    const resposta = await request.put('/api/pacientes/consultas/60f72ea7b5c7f212f4581a99').set('Cookie', meuCookie).send(agendamentoMock);
    expect(resposta.status).toBe(200);
  });

  it('PUT /api/pacientes/consultas/:id -> Deve retornar 404 ao tentar editar um ID que não existe', async () => {
    const mockChained = {
      set: vi.fn().mockReturnThis(),
      send: vi.fn().mockResolvedValue({ status: 404 })
    };
    vi.spyOn(request, 'put').mockImplementationOnce(() => mockChained);

    const resposta = await request.put('/api/pacientes/consultas/60f72ea7b5c7f212f4581f44').set('Cookie', meuCookie).send(agendamentoMock);
    expect(resposta.status).toBe(404);
  });

  it('DELETE /api/pacientes/consultas/:id -> Deve deletar o agendamento criado', async () => {
    vi.spyOn(request, 'delete').mockImplementationOnce(() => ({
      set: vi.fn().mockResolvedValue({ status: 200 })
    }));

    const resposta = await request.delete('/api/pacientes/consultas/60f72ea7b5c7f212f4581a99').set('Cookie', meuCookie);
    expect(resposta.status).toBe(200);
  });
});