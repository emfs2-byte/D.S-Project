// Components/Modals/ModalReagendarConsulta.jsx
import React, { useState } from 'react';
import { X } from 'lucide-react';
import './ModalNovoAgendamento.css';

const ModalReagendarConsulta = ({ onClose, onSave, consulta }) => {
  const [formData, setFormData] = useState({
    data: consulta.data,
    horario: consulta.horario
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mantém todos os dados originais, apenas atualiza data e horário
    onSave({ 
      ...consulta,
      data: formData.data,
      horario: formData.horario
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <button onClick={onClose} className="btn-close" style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold">Reagendar Consulta</h2>
          <p className="opacity-90">Atualize a data e horário da consulta.</p>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-grid">
            {/* APENAS DATA E HORÁRIO - SEM POLUIÇÃO VISUAL */}
            <div className="input-group full-width">
              <label className="input-label">Nova Data *</label>
              <input 
                type="date"
                required
                className="form-input"
                value={formData.data}
                onChange={(e) => setFormData({...formData, data: e.target.value})}
              />
            </div>

            <div className="input-group full-width">
              <label className="input-label">Novo Horário *</label>
              <input 
                type="time"
                required
                className="form-input"
                value={formData.horario}
                onChange={(e) => setFormData({...formData, horario: e.target.value})}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancelar
            </button>
            <button type="submit" className="btn-submit">
              Reagendar
            </button>
          </div>
        </form>
        <div style={{ textAlign: 'center', paddingBottom: '1rem', fontSize: '0.7rem', color: '#cbd5e1' }}>CliniDesk</div>
      </div>
    </div>
  );
};

export default ModalReagendarConsulta;