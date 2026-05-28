import React, { useState } from 'react';
import { X } from 'lucide-react';
import { agendarConsulta } from '../../lib/api';
import DatePicker from 'react-datepicker';
import { registerLocale } from "react-datepicker";
import ptBR from 'date-fns/locale/pt-BR';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import './ModalNovoAgendamento.css';

registerLocale('pt-BR', ptBR);

const ModalNovoAgendamento = ({ onClose, onSave, clinicas }) => {
  //O único useState necessário fica aqui dentro, inicializando 'data' como objeto Date
  const [formData, setFormData] = useState({
    nome_paciente: '',
    responsavel: '',
    telefone_paciente: '',
    telefone_responsavel: '',
    setor: clinicas[0]?.nome || '',
    data: new Date(),
    horario: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🔵 HandleSubmit chamado');

    try {
      console.log('📨 Preparando e higienizando dados para envio...');
      
      // Converte o objeto Date do react-datepicker para "AAAA-MM-DD" antes de ir para o Mongo
      const dadosProntosParaOBanco = {
        ...formData,
        data: format(formData.data, 'yyyy-MM-dd')
      };

      console.log('📦 Dados estruturados enviados ao Backend:', dadosProntosParaOBanco);

      console.log('📨 Chamando agendarConsulta...');
      const resultado = await agendarConsulta(dadosProntosParaOBanco);
      
      console.log('✅ Sucesso:', resultado);
      alert("Agendamento salvo com sucesso no banco de dados!");
      onSave(resultado.agendamento || resultado);
    } catch (error) {
      console.error("❌ Erro ao salvar:", error);
      alert("Erro ao salvar o agendamento. Verifique o console.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <button onClick={onClose} className="btn-close" style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold">Novo Agendamento</h2>
          <p className="opacity-90">Preencha os dados para agendar uma nova consulta.</p>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-grid">
            <div className="input-group">
              <label className="input-label">Paciente *</label>
              <input
                required
                className="form-input"
                placeholder="Nome do paciente"
                onChange={(e) => setFormData({...formData, nome_paciente: e.target.value})}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Responsável *</label>
              <input
                required
                className="form-input"
                placeholder="Nome do responsável"
                onChange={(e) => setFormData({...formData, responsavel: e.target.value})}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Tel. Paciente</label>
              <input
                className="form-input"
                placeholder="+55 (81) 99999-0000"
                onChange={(e) => setFormData({...formData, telefone_paciente: e.target.value})}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Tel. Responsável *</label>
              <input
                required
                className="form-input"
                placeholder="+55 (81) 99999-0000"
                onChange={(e) => setFormData({...formData, telefone_responsavel: e.target.value})}
              />
            </div>

            <div className="input-group full-width">
              <label className="input-label">Setor *</label>
              <select 
                className="form-select"
                value={formData.setor}
                onChange={(e) => setFormData({...formData, setor: e.target.value})}
              >
                {clinicas.map((clinica, index) => (
                  <option key={index} value={clinica.nome}>
                    {clinica.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Data *</label>
              <DatePicker
                selected={formData.data}
                onChange={(date) => setFormData({ ...formData, data: date })}
                locale="pt-BR"
                dateFormat="dd/MM/yyyy"
                className="form-input" // Ajustado para usar o padrão visual dos outros campos
              />
            </div>

            <div className="input-group">
              <label className="input-label">Horário *</label>
              <input 
                type="time"
                required
                className="form-input"
                onChange={(e) => setFormData({...formData, horario: e.target.value})}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancelar
            </button>
            <button type="submit" className="btn-submit">
              Agendar
            </button>
          </div>
        </form>
        <div style={{ textAlign: 'center', paddingBottom: '1rem', fontSize: '0.7rem', color: '#cbd5e1' }}>CliniDesk</div>
      </div>
    </div>
  );
};

export default ModalNovoAgendamento;