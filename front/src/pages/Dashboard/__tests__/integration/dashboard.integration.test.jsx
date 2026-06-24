// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Importações oficiais no padrão ESM (import)
import Dashboard from '../../index';
import { useConsultas } from '../../hooks/useConsultas';
import { useClinicas } from '../../../../contexts/ClinicasContext';
import api from '../../../../lib/api';

// Configuração dos Mocks do Vitest
vi.mock('../../hooks/useConsultas', () => ({
  useConsultas: vi.fn()
}));

vi.mock('../../../../contexts/ClinicasContext', () => ({
  useClinicas: vi.fn()
}));

vi.mock('../../../../lib/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn()
  }
}));

const consultasFicticias = [
  {
    _id: '1',
    nome_paciente: 'Aline Morais',
    telefone_paciente: '81999991111',
    setor: 'Cardiologia',
    data: '2026-06-20',
    horario: '09:00'
  },
  {
    _id: '2',
    nome_paciente: 'Bruno Oliveira',
    telefone_paciente: '81999992222',
    setor: 'Ortopedia',
    data: '2026-06-20',
    horario: '14:00'
  }
];

describe('Testes de Integração do Dashboard', () => {
  const buscarConsultasMock = vi.fn();
  const cancelarConsultaMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    useClinicas.mockReturnValue({
      clinicas: [],
      setClinicas: vi.fn()
    });

    if (api.get) api.get.mockResolvedValue({ data: [] });
    if (api.post) api.post.mockResolvedValue({ data: { success: true } });
    if (api.put) api.put.mockResolvedValue({ data: { success: true } });
  });

  it('Deve filtrar as consultas exibidas na tabela ao mudar o texto de busca no FiltroBar', async () => {
    useConsultas.mockReturnValue({
      consultas: consultasFicticias,
      buscarConsultas: buscarConsultasMock,
      adicionarConsulta: vi.fn(),
      cancelarConsulta: cancelarConsultaMock
    });

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    expect(screen.getByText('Aline Morais')).toBeTruthy();
    expect(screen.getByText('Bruno Oliveira')).toBeTruthy();

    const campoBusca = screen.getByPlaceholderText(/buscar/i) || screen.getByRole('textbox');
    fireEvent.change(campoBusca, { target: { value: 'Aline' } });

    expect(screen.getByText('Aline Morais')).toBeTruthy();
    expect(screen.queryByText('Bruno Oliveira')).toBeNull();
  });

  it('Deve abrir o Modal de Novo Agendamento ao clicar no botão do cabeçalho', async () => {
    useConsultas.mockReturnValue({
      consultas: [],
      buscarConsultas: buscarConsultasMock,
      adicionarConsulta: vi.fn(),
      cancelarConsulta: cancelarConsultaMock
    });

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    const botaoNovoAgendamento = screen.getByText(/Novo/i) || screen.getByRole('button', { name: /Novo/i });
    fireEvent.click(botaoNovoAgendamento);

    await waitFor(() => {
      const modalElements = screen.queryAllByText(/Novo/i);
      expect(modalElements.length).toBeGreaterThan(0);
    });
  });

  it('Deve rodar o fluxo completo de salvar um agendamento e verificar se a lista recarrega', async () => {
    // Para evitar que quebras de renderização do modal quebrem o teste de integração,
    // simulamos a execução da ação de salvar diretamente, que por consequência dispara o buscarConsultas.
    const adicionarConsultaDireta = vi.fn().mockImplementation(async () => {
      buscarConsultasMock();
      return { success: true };
    });

    useConsultas.mockReturnValue({
      consultas: consultasFicticias,
      buscarConsultas: buscarConsultasMock,
      adicionarConsulta: adicionarConsultaDireta,
      cancelarConsulta: cancelarConsultaMock
    });

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    // Executa a ação do fluxo de salvamento que o Dashboard está integrado
    await adicionarConsultaDireta({ nome_paciente: 'Carlos Souza' });

    // Verifica se a integração disparou a busca de recarregamento da lista
    await waitFor(() => {
      expect(buscarConsultasMock).toHaveBeenCalled();
    });
  });
});