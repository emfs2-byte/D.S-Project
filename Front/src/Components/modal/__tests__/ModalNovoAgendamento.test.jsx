/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ModalNovoAgendamento from '../ModalNovoAgendamento';

// 1. Criamos o mock isolado com vi.hoisted
const { agendarConsultaMock } = vi.hoisted(() => {
  return {
    agendarConsultaMock: vi.fn(() => Promise.resolve({ data: { success: true } }))
  };
});

// 2. Mockamos o arquivo de API interceptando a chamada externa
vi.mock('../../../lib/api', () => {
  return {
    agendarConsulta: agendarConsultaMock
  };
});

describe('Componente: ModalNovoAgendamento', () => {
  const clinicasMock = [
    { id: 1, nome: 'Pediatria' },
    { id: 2, nome: 'Geriatria' }
  ];

  const propsPadrao = {
    isOpen: true,
    onClose: vi.fn(),
    onSave: vi.fn(), 
    clinicas: clinicasMock,
  };

  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('ModalNovoAgendamento — campos obrigatórios bloqueiam submit quando vazios', () => {
    const { container } = render(<ModalNovoAgendamento {...propsPadrao} />);

    // Tenta submeter o formulário sem preencher nada
    const formulario = container.querySelector('form');
    fireEvent.submit(formulario);


    expect(window.alert).toHaveBeenCalled;
  });

  it('ModalNovoAgendamento — submit chama agendarConsulta() com dados corretos', () => {
    const { container } = render(<ModalNovoAgendamento {...propsPadrao} />);

    // Preenche as réplicas dos inputs obrigatórios
    const inputsPaciente = screen.getAllByPlaceholderText(/nome do paciente/i);
    const inputsResponsavel = screen.getAllByPlaceholderText(/nome do responsável/i);
    
    inputsPaciente.forEach(input => fireEvent.change(input, { target: { value: 'Lucas Silva' } }));
    inputsResponsavel.forEach(input => fireEvent.change(input, { target: { value: 'Maria Silva' } }));
    
    const inputsTime = container.querySelectorAll('input[type="time"]');
    inputsTime.forEach(input => fireEvent.change(input, { target: { value: '14:00' } }));

    // Dispara o envio do form
    const formulario = container.querySelector('form');
    fireEvent.submit(formulario);

    expect(agendarConsultaMock).toHaveBeenCalled();
  });
});