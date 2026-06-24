// Components/Modals/ModalConfirmarCancelamento.jsx
import React, { useState } from 'react';
import { X, AlertTriangle, MessageCircle } from 'lucide-react';
import './ModalConfirmarCancelamento.css';

const ModalConfirmarCancelamento = ({ consulta, onClose, onConfirm }) => {
  const [aguardandoWhatsApp, setAguardandoWhatsApp] = useState(false);
  
  const dataFormatada = new Date(consulta.data).toLocaleDateString('pt-BR');
  
  const handleConfirmarClick = () => {
    // Apenas desabilita o botão Confirmar e mostra área do WhatsApp
    setAguardandoWhatsApp(true);
  };

  const handleWhatsAppClick = () => {
    const numeroWhatsApp = consulta.telefone_paciente || consulta.telefone_responsavel;
    
    if (!numeroWhatsApp || numeroWhatsApp.trim() === '') {
      alert('❌ Nenhum número de telefone cadastrado');
      return;
    }

    const mensagem = `Olá! Sua consulta do dia ${dataFormatada} às ${consulta.horario} foi CANCELADA.`;

    const numeroLimpo = numeroWhatsApp.replace(/\D/g, '');
    const numeroCompleto = numeroLimpo.startsWith('55') ? numeroLimpo : `55${numeroLimpo}`;
    const link = `https://wa.me/${numeroCompleto}?text=${encodeURIComponent(mensagem)}`;
    
    window.open(link, '_blank');
    
    // Após abrir o WhatsApp, confirma o cancelamento e fecha
    onConfirm();
    onClose();
  };
  
  return (
    <div className="modal-overlay-cancel">
      <div className="modal-container-cancel">
        <div className="modal-header-cancel">
          <div className="modal-icon-cancel">
            <AlertTriangle size={28} />
          </div>
          <button 
            onClick={onClose} 
            className="btn-close-cancel"
            // X sempre funcionando
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-body-cancel">
          <h3 className="modal-title-cancel">Cancelar consulta?</h3>
          <p className="modal-message-cancel">
            Deseja cancelar a consulta de <strong>{consulta.nome_paciente}</strong> agendada para <strong>{dataFormatada}</strong> às <strong>{consulta.horario}</strong>?
          </p>
        </div>
        
        <div className="modal-footer-cancel">
          <button 
            onClick={onClose} 
            className="btn-cancel-voltar"
            // Voltar sempre funcionando
          >
            Voltar
          </button>
          
          <button 
            onClick={handleConfirmarClick}
            className="btn-cancel-confirmar"
            disabled={aguardandoWhatsApp}
            style={{ 
              opacity: aguardandoWhatsApp ? 0.5 : 1,
              cursor: aguardandoWhatsApp ? 'not-allowed' : 'pointer'
            }}
          >
            Confirmar Cancelamento
          </button>
        </div>

        {/* Área obrigatória do WhatsApp - aparece após clicar em Confirmar */}
        {aguardandoWhatsApp && (
          <div className="whatsapp-obrigatorio-cancel">
            <p>⚠️ É obrigatório notificar o paciente para cancelar:</p>
            <button 
              onClick={handleWhatsAppClick}
              className="btn-whatsapp-enviar-obrigatorio"
            >
              <MessageCircle size={20} />
              Enviar notificação via WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalConfirmarCancelamento;