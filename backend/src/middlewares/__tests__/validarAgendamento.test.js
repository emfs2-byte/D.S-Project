import { describe, it, expect, vi } from 'vitest';
// Como o middleware usa o padrão antigo do Node (exports), importamos com require
const { validarAgendamento } = require('../validarAgendamento.js');

// Funções para simular (mockar) o Express
function mockReq(body) { return { body }; }
function mockRes() {
  const res = {};
  res.status = (code) => { res.statusCode = code; return res; };
  res.json = (body) => { res.jsonBody = body; return res; };
  return res;
}
const next = () => 'passou';

// Dados perfeitos de agendamento para usar como base
const payloadValido = {
  nome_paciente:       'Maria Silva',
  telefone_paciente:   '11999999999',
  responsavel:         'João Silva',
  telefone_responsavel:'11888888888',
  setor:               'Geriatria',
  data:                '2026-12-31', // Data futura válida
  horario:             '09:00',
};

describe('validarAgendamento', () => {
it('passa com payload completo e válido', () => {
    const res = mockRes();
    const nextEspiao = vi.fn(); // Cria uma função simulada que o Vitest consegue vigiar

    validarAgendamento(mockReq(payloadValido), res, nextEspiao);

    // Verifica se o middleware chamou a função nextEspiao() com sucesso
    expect(nextEspiao).toHaveBeenCalled();
  });

  it('falha sem campo nome_paciente — retorna status 422', () => {
    const { nome_paciente, ...semNome } = payloadValido;
    const res = mockRes();
    validarAgendamento(mockReq(semNome), res, next);
    expect(res.statusCode).toBe(422);
  });

  it('falha com setor inválido (Psiquiatria) — retorna status 422', () => {
    const res = mockRes();
    validarAgendamento(mockReq({ ...payloadValido, setor: 'Psiquiatria' }), res, next);
    expect(res.statusCode).toBe(422);
  });

  it('falha com data no passado — retorna status 422', () => {
    const res = mockRes();
    validarAgendamento(mockReq({ ...payloadValido, data: '2020-01-01' }), res, next);
    expect(res.statusCode).toBe(422);
  });

  it('falha com horário fora do expediente (07:00) — retorna status 422', () => {
    const res = mockRes();
    validarAgendamento(mockReq({ ...payloadValido, horario: '07:00' }), res, next);
    expect(res.statusCode).toBe(422);
  });
});