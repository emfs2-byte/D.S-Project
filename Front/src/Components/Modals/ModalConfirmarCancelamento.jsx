// Components/Modals/ModalConfirmarCancelamento.jsx
import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import './ModalConfirmarCancelamento.css';

const ModalConfirmarCancelamento = ({ consulta, onClose, onConfirm }) => {
  const dataFormatada = new Date(consulta.data).toLocaleDateString('pt-BR');
  
  return (
    <div className="modal-overlay-cancel">
      <div className="modal-container-cancel">
        <div className="modal-header-cancel">
          <div className="modal-icon-cancel">
            <AlertTriangle size={28} />
          </div>
          <button onClick={onClose} className="btn-close-cancel">
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-body-cancel">
          <h3 className="modal-title-cancel">Cancelar consulta?</h3>
          <p className="modal-message-cancel">
            Deseja cancelar a consulta de <strong>{consulta.paciente}</strong> agendada para <strong>{dataFormatada}</strong> às <strong>{consulta.horario}</strong>?
          </p>
        </div>
        
        <div className="modal-footer-cancel">
          <button onClick={onClose} className="btn-cancel-voltar">
            Voltar
          </button>
          <button onClick={onConfirm} className="btn-cancel-confirmar">
            Confirmar Cancelamento
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmarCancelamento;