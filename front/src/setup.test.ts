import { describe, it, expect } from 'vitest';

describe('Configuração Inicial (Smoke Test)', () => {
  it('deve conseguir executar um teste básico em TypeScript', () => {
    // Valida se o Vitest está rodando 
    const soma = 1 + 1;
    expect(soma).toBe(2);
  });

  it('deve conseguir ler o ambiente', () => {
    // Valida se o ambiente de testes está de pé sem quebrar
    expect(true).toBe(true);
  });
});