import { describe, it, expect } from 'vitest';

const camposObrigatorios = ['nome_paciente', 'telefone_paciente', 'setor', 'data', 'horario'];

const agendamentoValido = {
    nome_paciente: "Maria Silva",
    telefone_paciente: "81999999999",
    setor: "Geriatria",
    data: "2026-12-01",
    horario: "09:00"
};

function validarAgendamento(body) {
    for (const campo of camposObrigatorios) {
        if (!body[campo]) return { valido: false, campo };
    }
    return { valido: true };
}

describe('Dupla 4 — Feature Core: Agendamento', () => {

    it('1. Deve validar agendamento com todos os campos obrigatórios', () => {
        const resultado = validarAgendamento(agendamentoValido);
        expect(resultado.valido).toBe(true);
    });

    it('2. Deve rejeitar agendamento sem nome do paciente', () => {
        const resultado = validarAgendamento({ ...agendamentoValido, nome_paciente: '' });
        expect(resultado.valido).toBe(false);
        expect(resultado.campo).toBe('nome_paciente');
    });

    it('3. Deve rejeitar agendamento sem data', () => {
        const resultado = validarAgendamento({ ...agendamentoValido, data: '' });
        expect(resultado.valido).toBe(false);
        expect(resultado.campo).toBe('data');
    });

});
