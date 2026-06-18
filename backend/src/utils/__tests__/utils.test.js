import { describe, it, expect } from 'vitest';
import { isValidNome, isValidTelefone, isValidDataConsulta, isValidHorario } from '../validators.js';
import { formatarData, normalizarNome } from '../formatters.js';
import { diasParaConsulta, isHorarioDisponivel } from '../calculators.js';

// ── VALIDATORS ───────────────────────────────────────

describe('isValidNome', () => {
  it('aceita nome válido', () => {
    expect(isValidNome('Maria Silva')).toBe(true);
  });
  it('rejeita null', () => {
    expect(isValidNome(null)).toBe(false);
  });
  it('rejeita nome com números', () => {
    expect(isValidNome('Maria2')).toBe(false);
  });
});

describe('isValidTelefone', () => {
  it('aceita celular com 11 dígitos', () => {
    expect(isValidTelefone('(81) 99999-9999')).toBe(true);
  });
  it('rejeita telefone curto', () => {
    expect(isValidTelefone('1234')).toBe(false);
  });
  it('rejeita null', () => {
    expect(isValidTelefone(null)).toBe(false);
  });
});

describe('isValidDataConsulta', () => {
  it('rejeita data no passado', () => {
    expect(isValidDataConsulta('01/01/2020')).toBe(false);
  });
  it('rejeita formato ISO — aceita só DD/MM/YYYY', () => {
    expect(isValidDataConsulta('2025-12-25')).toBe(false);
  });
  it('rejeita null', () => {
    expect(isValidDataConsulta(null)).toBe(false);
  });
});

describe('isValidHorario', () => {
  it('aceita horário dentro do expediente', () => {
    expect(isValidHorario('09:30')).toBe(true);
  });
  it('rejeita 18:01 — fora do expediente', () => {
    expect(isValidHorario('18:01')).toBe(false);
  });
  it('rejeita null', () => {
    expect(isValidHorario(null)).toBe(false);
  });
});

// ── FORMATTERS ───────────────────────────────────────

describe('formatarData', () => {
  it('aceita e retorna data no formato brasileiro', () => {
    expect(formatarData('25/12/2025')).toBe('25/12/2025');
  });
  it('lança TypeError para null', () => {
    expect(() => formatarData(null)).toThrow(TypeError);
  });
});

describe('normalizarNome', () => {
  it('capitaliza e remove espaços extras', () => {
    expect(normalizarNome('  maria silva  ')).toBe('Maria Silva');
  });
  it('lança TypeError para null', () => {
    expect(() => normalizarNome(null)).toThrow(TypeError);
  });
});

// ── CALCULATORS ──────────────────────────────────────

describe('diasParaConsulta', () => {
  it('retorna número positivo para data futura', () => {

    const resultado = diasParaConsulta('2099-12-31');
    expect(resultado).toBeGreaterThan(0);
  });
  it('lança TypeError para null', () => {
    expect(() => diasParaConsulta(null)).toThrow(TypeError);
  });
});

describe('isHorarioDisponivel', () => {
  it('retorna false para horário ocupado', () => {
    expect(isHorarioDisponivel('09:00', [{ horario: '09:00' }])).toBe(false);
  });
  it('retorna true para horário livre', () => {
    expect(isHorarioDisponivel('10:00', [{ horario: '09:00' }])).toBe(true);
  });
  it('lança TypeError se lista for null', () => {
    expect(() => isHorarioDisponivel('09:00', null)).toThrow(TypeError);
  });
});