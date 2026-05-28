// Components/Modals/ModalEditarConsulta.jsx
import React, { useState } from 'react';
import { X } from 'lucide-react';
import './ModalNovoAgendamento.css';

const ModalEditarConsulta = ({ onClose, onSave, consulta, clinicas }) => {
  const [formData, setFormData] = useState({
    nome_paciente: consulta.nome_paciente,
    responsavel: consulta.responsavel,
    telefone_paciente: consulta.telefone_paciente || '',
    telefone_responsavel: consulta.telefone_responsavel,
    setor: consulta.setor
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      data: consulta.data,
      horario: consulta.horario,
      lembrete_enviado_por: consulta.lembrete_enviado_por
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <button onClick={onClose} className="btn-close" style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold">Editar Consulta</h2>
          <p className="opacity-90">Atualize os dados da consulta.</p>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-grid">
            <div className="input-group">
              <label className="input-label">Paciente *</label>
              <input
                required
                className="form-input"
                value={formData.nome_paciente}
                placeholder="Nome do paciente"
                onChange={(e) => setFormData({...formData, nome_paciente: e.target.value})}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Responsável *</label>
              <input
                required
                className="form-input"
                value={formData.responsavel}
                placeholder="Nome do responsável"
                onChange={(e) => setFormData({...formData, responsavel: e.target.value})}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Tel. Paciente</label>
              <input
                className="form-input"
                value={formData.telefone_paciente}
                placeholder="+55 (81) 99999-0000"
                onChange={(e) => setFormData({...formData, telefone_paciente: e.target.value})}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Tel. Responsável *</label>
              <input
                required
                className="form-input"
                value={formData.telefone_responsavel}
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

          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancelar
            </button>
            <button type="submit" className="btn-submit">
              Salvar
            </button>
          </div>
        </form>
        <div style={{ textAlign: 'center', paddingBottom: '1rem', fontSize: '0.7rem', color: '#cbd5e1' }}>CliniDesk</div>
      </div>
    </div>
  );
};

export default ModalEditarConsulta;