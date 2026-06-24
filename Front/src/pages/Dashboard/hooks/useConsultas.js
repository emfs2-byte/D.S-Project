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

  // Adiciona uma consulta nova
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

  // Cancela uma consulta
  const cancelarConsulta = async (consultaAlvo) => {
    try {
      const isRetorno = consultaAlvo.tipo === 'Retorno';
      const url = isRetorno 
        ? `/pacientes/consultas/retornos/${consultaAlvo._id}` 
        : `/pacientes/consultas/${consultaAlvo._id}`;

      await api.delete(url);
      setConsultas(anterior => anterior.filter(c => c._id !== consultaAlvo._id));
    } catch (error) {
      console.error("Erro ao cancelar consulta:", error);
      alert('Não foi possível cancelar o agendamento.');
      return false;
    }
  };

  // 🔥 SALVAR EDIÇÃO - CORRIGIDO 🔥
  const salvarEdicao = async (consultaOriginal, consultaEditada) => {
    try {
      console.log('📝 Editando consulta:', consultaOriginal._id);
      console.log('📝 Dados editados:', consultaEditada);
      
      // Verifica se o ID é válido
      if (!consultaOriginal || !consultaOriginal._id) {
        console.error('❌ ID da consulta é inválido');
        alert('Erro: ID da consulta não encontrado.');
        return false;
      }
      
      // Envia os dados editados para o backend
      const resposta = await api.put(`/pacientes/consultas/${consultaOriginal._id}`, consultaEditada);
      
      console.log('✅ Resposta do backend:', resposta.data);
      
      // Recarrega a lista completa do banco para garantir dados atualizados
      await buscarConsultas();
      
      return true;
    } catch (error) {
      console.error('❌ Erro ao editar consulta:');
      console.error('Status:', error.response?.status);
      console.error('Dados do erro:', error.response?.data);
      alert(error.response?.data?.erro || 'Não foi possível salvar as alterações.');
      return false;
    }
  };

  // 🔥 REAGENDAR CONSULTA - CORRIGIDO 🔥
  const salvarReagendamento = async (id, dadosReagendados) => {
    try {
      console.log('📝 Reagendando:', id, dadosReagendados);
      
      if (!id || id === 'undefined') {
        console.error('❌ ID inválido:', id);
        alert('Erro: ID da consulta não encontrado.');
        return false;
      }
      
      const resposta = await api.put(`/pacientes/consultas/${id}`, {
        data: dadosReagendados.data,
        horario: dadosReagendados.horario
      });
      
      console.log('✅ Resposta do backend:', resposta.data);
      await buscarConsultas();
      return true;
    } catch (error) {
      console.error('❌ Erro ao reagendar consulta:');
      console.error('Status:', error.response?.status);
      console.error('Dados do erro:', error.response?.data);
      alert(error.response?.data?.erro || 'Não foi possível reagendar.');
      return false;
    }
  };

  // Liga/desliga o lembrete de uma consulta
  const toggleLembrete = (idConsulta, nomeUsuario) => {
    setConsultas(anterior => 
      anterior.map(consulta => {
        if (consulta && consulta._id === idConsulta) {
          return {
            ...consulta,
            lembrete_enviado_por: consulta.lembrete_enviado_por ? null : nomeUsuario,
            lembrete_enviado_em: consulta.lembrete_enviado_por ? null : new Date().toLocaleString()
          };
        }
        return consulta;
      })
    );
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