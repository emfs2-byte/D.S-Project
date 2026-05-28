import { useState } from 'react';
import { consultasMock } from '../../../data/consultasMock';

export const useConsultas = () => {
  const [consultas, setConsultas] = useState(consultasMock);

  // Adiciona uma consulta nova
  const adicionarConsulta = (novaConsulta) => {
    setConsultas(anterior => [
      ...anterior,
      { ...novaConsulta, lembrete_enviado_por: null, lembrete_enviado_em: null }
    ]);
  };

  // Cancela (remove) uma consulta
  const cancelarConsulta = (consultaAlvo) => {
    setConsultas(anterior => anterior.filter(c => c !== consultaAlvo));
  };

  // Salva edição de uma consulta existente
  const salvarEdicao = (consultaOriginal, consultaEditada) => {
    setConsultas(anterior =>
      anterior.map(c => c === consultaOriginal ? consultaEditada : c)
    );
  };

  // Reagenda uma consulta existente
  const salvarReagendamento = (consultaOriginal, consultaReagendada) => {
    setConsultas(anterior =>
      anterior.map(c => c === consultaOriginal ? consultaReagendada : c)
    );
  };

  // Liga/desliga o lembrete de uma consulta
  const toggleLembrete = (index, nomeUsuario) => {
    setConsultas(anterior => {
      const copia = [...anterior];
      const consulta = copia[index];

      if (consulta.lembrete_enviado_por) {
        consulta.lembrete_enviado_por = null;
        consulta.lembrete_enviado_em = null;
      } else {
        consulta.lembrete_enviado_por = nomeUsuario;
        consulta.lembrete_enviado_em = new Date().toLocaleString();
      }

      return copia;
    });
  };

  // Retorna tudo que o Dashboard vai precisar usar
  return {
    consultas,
    adicionarConsulta,
    cancelarConsulta,
    salvarEdicao,
    salvarReagendamento,
    toggleLembrete,
  };
};