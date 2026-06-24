import React from 'react';
import { X, MessageCircle } from 'lucide-react';
import './ModalEscolherWhatsApp.css';

const ModalEscolherWhatsApp = ({ consulta, onClose, onConfirm }) => {
  // Corrige offset UTC do MongoDB (+3h Brasil)
  const formatarData = (dataRaw) => {
    if (!dataRaw) return '';
    if (typeof dataRaw === 'string' && dataRaw.includes('/')) return dataRaw;
    const data = new Date(dataRaw);
    const corrigida = new Date(data.getTime() + data.getTimezoneOffset() * 60000);
    return corrigida.toLocaleDateString('pt-BR');
  };

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

  const abrirWhatsApp = (telefone, nomeDestinatario) => {
    if (!telefone || telefone === 'Número não informado') {
      alert(`Número de telefone do ${nomeDestinatario} não está disponível.`);
      return;
    }
    const numero = telefone.replace(/\D/g, '');
    const dataFormatada = formatarData(consulta.data);
    const mensagem = `Olá! Gostaria de lembrar da consulta de ${consulta.nome_paciente} agendada para ${dataFormatada} às ${consulta.horario}.`;
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
            Para qual número deseja enviar a confirmação da consulta de <strong>{consulta.nome_paciente}</strong>?
          </p>
        </div>

        <div className="modal-options-whats">
          <button
            onClick={() => abrirWhatsApp(consulta.telefone_paciente, 'Paciente')}
            className="btn-whats-paciente"
          >
            <div className="whats-option-icon">📱</div>
            <div className="whats-option-text">
              <strong>Paciente ({consulta.nome_paciente})</strong>
              <span className="telefone-number">{formatarTelefone(consulta.telefone_paciente)}</span>
            </div>
          </button>

          <button
            onClick={() => abrirWhatsApp(consulta.telefone_responsavel, 'Responsável')}
            className="btn-whats-responsavel"
          >
            <div className="whats-option-icon">👨‍👩‍👧</div>
            <div className="whats-option-text">
              <strong>Responsável ({consulta.responsavel})</strong>
              <span className="telefone-number">{formatarTelefone(consulta.telefone_responsavel)}</span>
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
