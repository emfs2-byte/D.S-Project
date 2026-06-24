// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers'; 
import ConsultasTable from '../components/ConsultasTable.jsx';

expect.extend(matchers);

vi.mock('../../../lib/utils', () => ({
  getHorarioColor: () => 'horario-normal',
  getSetorColor: () => ({ background: '#fff', color: '#000' }),
}));

const consultasMock = [
  { 
    id: 1, 
    nome_paciente: 'Carlos Eduardo', 
    responsavel: 'Maria Eduardo',
    setor: 'Geriatria', 
    data: '2026-06-20', 
    dataRetorno: '2026-06-20T00:00:00', 
    horario: '14:00', 
    telefone_paciente: '81999998888',
    telefone_responsavel: '81988887777',
    lembrete_enviado_por: null
  }
];

const propsPadrao = {
  abaAtiva: 'consultas',
  selecionados: [],
  onToggleSelecao: vi.fn(),
  onSelecionarTodos: vi.fn(),
  onToggleLembrete: vi.fn(),
  onEditar: vi.fn(),
  onReagendar: vi.fn(),
  onCancelar: vi.fn(),
  onWhatsApp: vi.fn()
};

describe('Componente: ConsultasTable', () => {
  
  beforeEach(() => {
    vi.spyOn(window, 'open').mockImplementation(() => ({}));
  });

  it('deve renderizar a mensagem de lista vazia quando não houver consultas', () => {
    render(<ConsultasTable {...propsPadrao} consultas={[]} />);
    
    const mensagemVazia = screen.getByText('Nenhuma consulta encontrada para este filtro.');
    expect(mensagemVazia).toBeInTheDocument();
  });

  it('deve renderizar a quantidade correta de linhas para as consultas passadas', () => {
    render(<ConsultasTable {...propsPadrao} consultas={consultasMock} />);
    
    expect(screen.getByText('Carlos Eduardo')).toBeInTheDocument();
  });

it('deve chamar a função onCancelar ao clicar no botão cancelar', () => {
    const onCancelarEspiao = vi.fn();
    render(<ConsultasTable {...propsPadrao} consultas={consultasMock} onCancelar={onCancelarEspiao} />);
    
    const botoesCancelar = screen.getAllByTitle('Cancelar');

    const botaoValido = botoesCancelar[botoesCancelar.length - 1];
    fireEvent.click(botaoValido);
    
    expect(onCancelarEspiao).toHaveBeenCalledWith(consultasMock[0]);
  });

  it('deve chamar a função onWhatsApp ao clicar no botão do WhatsApp na aba normal', () => {
    const onWhatsAppEspiao = vi.fn();
    render(<ConsultasTable {...propsPadrao} abaAtiva="consultas" consultas={consultasMock} onWhatsApp={onWhatsAppEspiao} />);
    
    const botoesWhats = screen.getAllByTitle('Enviar WhatsApp');
    
    const botaoValido = botoesWhats[botoesWhats.length - 1];
    fireEvent.click(botaoValido);
    
    expect(onWhatsAppEspiao).toHaveBeenCalledWith(consultasMock[0]);
  });
});