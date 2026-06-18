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

 const adicionarConsulta = async (novaConsulta) => {
    try {
      const token = localStorage.getItem('@CliniDesk:token');
      
      await axios.post('http://localhost:5000/api/pacientes/consultas', novaConsulta, {
        headers: { Authorization: `Bearer ${token}` }
      });

      await buscarConsultas(); 
      
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

      await buscarConsultas();

    } catch (error) {
      console.error('Erro ao cancelar consulta:', error);
      alert('Não foi possível cancelar o agendamento.');
    }
  };

  // Salva edição de uma consulta existente direto no banco de dados
  const salvarEdicao = async (idConsulta, dadosAtualizados) => {
    try {
      const token = localStorage.getItem('@CliniDesk:token');
      
      // Faz a requisição PUT enviando o ID na URL e as alterações no body
      const resposta = await axios.put(`http://localhost:5000/api/pacientes/consultas/${idConsulta}`, dadosAtualizados, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // O backend retorna o agendamento atualizado dentro de resposta.data.agendamento
      const consultaAtualizadaDoBanco = resposta.data.agendamento;

      // Atualiza o estado do React substituindo apenas a consulta modificada
      setConsultas(anterior =>
        anterior.map(c => c._id === idConsulta ? consultaAtualizadaDoBanco : c)
      );

      return true;
    } catch (error) {
      console.error('Erro ao salvar edição da consulta:', error);
      alert('Não foi possível atualizar as alterações no servidor.');
      return false;
    }
  };

  // Reagenda uma consulta existente direto no banco de dados
  const salvarReagendamento = async (idConsulta, dadosReagendados) => {
    try {
      const token = localStorage.getItem('@CliniDesk:token');
      
      // Envia as novas informações de data/horário para o backend
      const resposta = await axios.put(`http://localhost:5000/api/pacientes/consultas/${idConsulta}`, dadosReagendados, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const consultaAtualizadaDoBanco = resposta.data.agendamento;

      // Atualiza o estado local do React com a nova data/horário
      setConsultas(anterior =>
        anterior.map(c => c._id === idConsulta ? consultaAtualizadaDoBanco : c)
      );

      return true;
    } catch (error) {
      console.error('Erro ao salvar reagendamento da consulta:', error);
      alert('Não foi possível atualizar o reagendamento no servidor.');
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