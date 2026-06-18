/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FiltroBar from '../components/FiltroBar';

describe('Componente: FiltroBar', () => {
  const propsPadrao = {
    onDataChange: vi.fn(),
    onSetorChange: vi.fn(),
    onBuscarChange: vi.fn(), 
    dataSelecionada: '2026-06-18',
    setorSelecionado: '',
    busca: '',
  };

  it('FiltroBar — dispara onDataChange ao trocar data', () => {
    const onDataChangeEspiao = vi.fn();
    const { container } = render(<FiltroBar {...propsPadrao} onDataChange={onDataChangeEspiao} />);

    const inputData = container.querySelector('.datepicker-input');
    fireEvent.change(inputData, { target: { value: '19/06/2026' } });

    expect(onDataChangeEspiao).toHaveBeenCalled();
  });

  it('FiltroBar — dispara onSetorChange ao selecionar setor', () => {
    const onSetorChangeEspiao = vi.fn();
    const { container } = render(<FiltroBar {...propsPadrao} onSetorChange={onSetorChangeEspiao} />);

    const gatilhoSetor = container.querySelector('.trigger-setor');
    fireEvent.click(gatilhoSetor);

    expect(gatilhoSetor).toBeTruthy();
  });

  it('FiltroBar — campo de busca filtra consultas por nome ao digitar', () => {
    const onBuscarChangeEspiao = vi.fn();
    render(<FiltroBar {...propsPadrao} onBuscarChange={onBuscarChangeEspiao} />);

    const inputsBusca = screen.getAllByPlaceholderText(/Buscar por paciente ou telefone/i);

    inputsBusca.forEach(input => {
      fireEvent.change(input, { target: { value: 'Carlos Eduardo' } });
    });

    expect(onBuscarChangeEspiao).toHaveBeenCalledWith('Carlos Eduardo');
  });
});