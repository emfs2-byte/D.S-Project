import { describe, it, expect, vi } from 'vitest';
import { gerarLinkWhatsApp } from '../whatsapp.js';
import { getSetorColor } from '../utils.js';

// ── TESTE DO WHATSAPP ──────────────────
describe('Funcionalidade: Sistema de confirmação via Deep Link', () => {
  it('deve gerar o link correto com o número e a mensagem formatada', () => {
    // Simula o window.open do navegador
    const windowSpy = vi.spyOn(window, 'open').mockImplementation(() => {});

    const telefone = '(81) 99999-8888';
    const mensagem = 'Olá, paciente! Sua consulta está confirmada.';

    // Executa a função do seu arquivo whatsapp.js
    gerarLinkWhatsApp(telefone, mensagem);

    const telefoneLimpo = '81999998888';
    const linkEsperado = `https://wa.me/${telefoneLimpo}?text=${encodeURIComponent(mensagem)}`;
    
    // Verifica se abriu a nova aba
    expect(windowSpy).toHaveBeenCalledWith(linkEsperado, '_blank');

    windowSpy.mockRestore();
  });
});

// ── TESTES DE CORES E SETORES ─────────────────
describe('getSetorColor()', () => {
  it('retorna o objeto de cores correto para um setor existente', () => {
    const corObjeto = getSetorColor('Geriatria');
    expect(corObjeto).toEqual({ background: "#dcfce7", color: "#166534" });
  });

  it('retorna objeto de cor padrão (fallback) para setor desconhecido', () => {
    const corFallback = getSetorColor('SetorInexistente');
    expect(corFallback).toEqual({ background: "#f1f5f9", color: "#475569" });
  });
});