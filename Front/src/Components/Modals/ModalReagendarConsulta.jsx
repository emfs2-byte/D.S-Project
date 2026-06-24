// Components/Modals/ModalReagendarConsulta.jsx
import React, { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';
import './ModalNovoAgendamento.css';

const ModalReagendarConsulta = ({ onClose, onSave, consulta }) => {
  const [formData, setFormData] = useState({
    data: consulta.data,
    horario: consulta.horario
  });
  const [aguardandoWhatsApp, setAguardandoWhatsApp] = useState(false);

  const handleWhatsAppClick = () => {
    // 🔥 LOGS PARA DEBUG 🔥
    console.log('🔍 ===== WHATSAPP CLICK =====');
    console.log('📝 consulta._id:', consulta._id);
    console.log('📝 Tipo do ID:', typeof consulta._id);
    console.log('📝 formData:', formData);
    console.log('📝 consulta completa:', consulta);
    
    // Verifica se o ID existe
    if (!consulta._id) {
      console.error('❌ ID da consulta é undefined!');
      alert('Erro: ID da consulta não encontrado.');
      return;
    }

    const numeroWhatsApp = consulta.telefone_paciente || consulta.telefone_responsavel;
    
    if (!numeroWhatsApp || numeroWhatsApp.trim() === '') {
      alert('❌ Nenhum número de telefone cadastrado');
      return;
    }

    const mensagem = `Olá! Sua consulta foi reagendada para ${formData.data} às ${formData.horario}.`;

    const numeroLimpo = numeroWhatsApp.replace(/\D/g, '');
    const numeroCompleto = numeroLimpo.startsWith('55') ? numeroLimpo : `55${numeroLimpo}`;
    const link = `https://wa.me/${numeroCompleto}?text=${encodeURIComponent(mensagem)}`;
    
    window.open(link, '_blank');
    
    console.log('📤 Chamando onSave com:', {
      id: consulta._id,
      dados: {
        data: formData.data,
        horario: formData.horario
      }
    });
    
    onSave(consulta._id, {
      data: formData.data,
      horario: formData.horario
    });
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAguardandoWhatsApp(true);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <button 
            onClick={onClose} 
            className="btn-close"
            style={{ 
              position: 'absolute', 
              right: '1.5rem', 
              top: '1.5rem', 
              color: 'white', 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer'
            }}
          >
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold">Reagendar Consulta</h2>
          <p className="opacity-90">Atualize a data e horário da consulta.</p>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-grid">
            <div className="input-group full-width">
              <label className="input-label">Nova Data *</label>
              <input 
                type="date"
                required
                className="form-input"
                value={formData.data}
                disabled={aguardandoWhatsApp}
                style={{ 
                  backgroundColor: aguardandoWhatsApp ? '#e2e8f0' : '#f1f5f9',
                  transition: 'all 0.2s ease'
                }}
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
                disabled={aguardandoWhatsApp}
                style={{ 
                  backgroundColor: aguardandoWhatsApp ? '#e2e8f0' : '#f1f5f9',
                  transition: 'all 0.2s ease'
                }}
                onChange={(e) => setFormData({...formData, horario: e.target.value})}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button 
              type="button" 
              onClick={handleWhatsAppClick}
              className="btn-whatsapp-reagendar"
              disabled={!aguardandoWhatsApp}
              style={{
                transition: 'all 0.2s ease',
                opacity: !aguardandoWhatsApp ? 0.5 : 1,
                cursor: !aguardandoWhatsApp ? 'not-allowed' : 'pointer'
              }}
            >
              <MessageCircle size={20} />
              Notificar WhatsApp
            </button>
            
            <div style={{ flex: 1 }} />
            
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-submit"
              disabled={aguardandoWhatsApp}
              style={{
                transition: 'all 0.2s ease',
                opacity: aguardandoWhatsApp ? 0.5 : 1,
                cursor: aguardandoWhatsApp ? 'not-allowed' : 'pointer'
              }}
            >
              Reagendar
            </button>
          </div>
        </form>

        {aguardandoWhatsApp && (
          <div className="whatsapp-obrigatorio-reagendar">
            <p>⚠️ É obrigatório notificar o paciente sobre o reagendamento:</p>
          </div>
        )}

        <div style={{ textAlign: 'center', paddingBottom: '1rem', fontSize: '0.7rem', color: '#cbd5e1' }}>CliniDesk</div>
      </div>
    </div>
  );
};

export default ModalReagendarConsulta;