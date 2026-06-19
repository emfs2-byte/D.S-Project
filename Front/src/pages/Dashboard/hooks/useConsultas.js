import { useState, useEffect } from 'react';
import api from '../../../lib/api';
export const useConsultas = () => {
  const [consultas, setConsultas] = useState([]);

  // Busca as consultas do banco ao carregar
  const buscarConsultas = async () => {
    try {
      const resposta = await api.get('/pacientes/consultas');
      setConsultas(resposta.data || []);
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
    }
  };

  // Carrega ao montar o hook
  useEffect(() => {
    buscarConsultas();
  }, []);

  // Adiciona uma consulta nova (recarrega do banco para garantir dados atualizados)
   const adicionarConsulta = async (novaConsulta) => {
    try {
      const resposta = await api.post('/pacientes/consultas', novaConsulta);
      setConsultas(prev => [...prev, resposta.data]);
      return true;
    } catch (error) {
      console.error("Erro ao cadastrar agendamento:", error);
      return false;
    }
  };

  // Cancela (remove) uma consulta pelo _id do MongoDB
   const cancelarConsulta = async (consultaAlvo) => {
    try {
      await api.delete(`/pacientes/consultas/${consultaAlvo._id}`);
      setConsultas(anterior => anterior.filter(c => c._id !== consultaAlvo._id));
    } catch (error) {
      console.error('Erro ao cancelar consulta:', error);
      alert('Não foi possível cancelar o agendamento.');
    }
  };

  // Salva edição de uma consulta existente
  const salvarEdicao = async (consultaOriginal, consultaEditada) => {
    try {
        const resposta = await api.put(`/pacientes/consultas/${consultaOriginal._id}`, consultaEditada);
        setConsultas(anterior =>
            anterior.map(c => c._id === consultaOriginal._id ? resposta.data.agendamento : c)
        );
        return true;
    } catch (error) {
        console.error('Erro ao editar consulta:', error);
        alert('Não foi possível salvar as alterações.');
        return false;
    }
};
  // Reagenda uma consulta existente
  const salvarReagendamento = async (consultaOriginal, consultaReagendada) => {
    try {
        const resposta = await api.put(`/pacientes/consultas/${consultaOriginal._id}`, consultaReagendada);
        setConsultas(anterior =>
            anterior.map(c => c._id === consultaOriginal._id ? resposta.data.agendamento : c)
        );
        return true;
    } catch (error) {
        console.error('Erro ao reagendar consulta:', error);
        alert('Não foi possível reagendar.');
        return false;
    }
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

  return {
    consultas,
    buscarConsultas,
    adicionarConsulta,
    cancelarConsulta,
    salvarEdicao,
    salvarReagendamento,
    toggleLembrete,
  };
};