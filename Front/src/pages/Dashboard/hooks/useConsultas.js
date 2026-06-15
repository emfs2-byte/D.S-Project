import { useState, useEffect } from 'react';
import axios from 'axios';

export const useConsultas = () => {
  const [consultas, setConsultas] = useState([]);

  // Busca as consultas do banco ao carregar
  const buscarConsultas = async () => {
    try {
      const token = localStorage.getItem('@CliniDesk:token');
      if (!token) {
        console.warn('Token não encontrado');
        return;
      }

      const resposta = await axios.get('http://localhost:5000/api/pacientes/consultas', {
        headers: { Authorization: `Bearer ${token}` }
      });

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
      const token = localStorage.getItem('@CliniDesk:token');
      
      const resposta = await axios.post('http://localhost:5000/api/pacientes/consultas', novaConsulta, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Atualiza o estado local das consultas do dia corrente
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
      const token = localStorage.getItem('@CliniDesk:token');
      await axios.delete(`http://localhost:5000/api/pacientes/consultas/${consultaAlvo._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setConsultas(anterior => anterior.filter(c => c._id !== consultaAlvo._id));
    } catch (error) {
      console.error('Erro ao cancelar consulta:', error);
      alert('Não foi possível cancelar o agendamento.');
    }
  };

  // Salva edição de uma consulta existente
  const salvarEdicao = (consultaOriginal, consultaEditada) => {
    setConsultas(anterior =>
      anterior.map(c => c._id === consultaOriginal._id ? consultaEditada : c)
    );
  };

  // Reagenda uma consulta existente
  const salvarReagendamento = (consultaOriginal, consultaReagendada) => {
    setConsultas(anterior =>
      anterior.map(c => c._id === consultaOriginal._id ? consultaReagendada : c)
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