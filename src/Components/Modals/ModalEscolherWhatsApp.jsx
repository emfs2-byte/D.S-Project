// Components/Modals/ModalEscolherWhatsApp.jsx
import React from 'react';
import { X, MessageCircle } from 'lucide-react';
import './ModalEscolherWhatsApp.css';

const ModalEscolherWhatsApp = ({ consulta, onClose, onConfirm }) => {
  const formatarTelefone = (telefone) => {
    if (!telefone) return 'Número não informado';
    const num = telefone.replace(/\D/g, '');
    if (num.length === 11) {
      return `(${num.slice(0,2)}) ${num.slice(2,7)}-${num.slice(7)}`;
    }
    if (num.length === 10) {
      return `(${num.slice(0,2)}) ${num.slice(2,6)}-${num.slice(6)}`;
    }
    return telefone;
  };

  const abrirWhatsApp = (telefone) => {
    if (!telefone || telefone === 'Número não informado') {
      alert('Número de telefone não disponível');
      return;
    }
    const numero = telefone.replace(/\D/g, '');
    const mensagem = `Olá! Gostaria de lembrar da consulta agendada para ${new Date(consulta.data).toLocaleDateString('pt-BR')} às ${consulta.horario}.`;
    const link = `https://wa.me/55${numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(link, '_blank');
    onConfirm();
  };

  return (
    <div className="modal-overlay-whats">
      <div className="modal-container-whats">
        <div className="modal-header-whats">
          <div className="modal-icon-whats">
            <MessageCircle size={28} />
          </div>
          <button onClick={onClose} className="btn-close-whats">
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-body-whats">
          <h3 className="modal-title-whats">Enviar mensagem via WhatsApp</h3>
          <p className="modal-message-whats">
            Para qual número deseja enviar a confirmação da consulta de <strong>{consulta.paciente}</strong>?
          </p>
        </div>
        
        <div className="modal-options-whats">
          <button 
            onClick={() => abrirWhatsApp(consulta.telPaciente)}
            className="btn-whats-paciente"
          >
            <div className="whats-option-icon">📱</div>
            <div className="whats-option-text">
              <strong>Paciente</strong>
              <span className="telefone-number">{formatarTelefone(consulta.telPaciente)}</span>
            </div>
          </button>
          
          <button 
            onClick={() => abrirWhatsApp(consulta.telResponsavel)}
            className="btn-whats-responsavel"
          >
            <div className="whats-option-icon">👨‍👩‍👧</div>
            <div className="whats-option-text">
              <strong>Responsável</strong>
              <span className="telefone-number">{formatarTelefone(consulta.telResponsavel)}</span>
            </div>
          </button>
        </div>
        
        <div className="modal-footer-whats">
          <button onClick={onClose} className="btn-whats-voltar">
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEscolherWhatsApp;
