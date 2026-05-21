import { describe, it, expect, vi } from 'vitest';
// Pessoa 2 vai criar essa função em Front/src/lib/whatsapp.js
import { gerarLinkWhatsapp } from './whatsapp';

describe('Funcionalidade: Sistema de confirmação via Deep Link', () => {
  it('deve gerar o link correto com o número e a mensagem formatada', () => {
    // Mock do window.open
    // Como o deep link abre uma nova aba, simulamos isso
    const windowSpy = vi.spyOn(window, 'open').mockImplementation(() => {});

    const telefone = '5581999998888';
    const mensagem = '`Olá, paciente! Sua consulta no setor de x área está confirmada para o dia 12 às 14:00.';

    // 2. Execução (O que a Pessoa 2 vai implementar)
    gerarLinkWhatsapp(telefone, mensagem);

    // 3. Asserção (A segurança da demo) [cite: 7]
    // Verificamos se o link gerado segue o padrão do WhatsApp
    const linkEsperado = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    
    expect(windowSpy).toHaveBeenCalledWith(linkEsperado, '_blank');

    // Limpa o mock após o teste
    windowSpy.mockRestore();
  });
});