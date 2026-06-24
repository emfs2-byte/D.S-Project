import { useState } from "react";
import { format, parseISO } from "date-fns"; 
import { ptBR } from "date-fns/locale";   
import { gerarLinkWhatsApp } from "../../lib/whatsapp";
import "./ModalEnvioLote.css";

const ModalEnvioLote = ({ selecionados, onClose }) => {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const pacienteAtual = selecionados[indiceAtual];

  const handleEnviarProximo = () => {
    const dataFormatada = format(parseISO(pacienteAtual.data), "dd/MM/yyyy", {
      locale: ptBR,
    });

    const mensagem = `Olá! Gostaria de lembrar da consulta de ${pacienteAtual.nome_paciente} agendada para ${dataFormatada} às ${pacienteAtual.horario}.`;

    gerarLinkWhatsApp(pacienteAtual.telefone_paciente, mensagem);

    if (indiceAtual < selecionados.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>
          Envio em Lote ({indiceAtual + 1} de {selecionados.length})
        </h2>
        <p>
          Enviando para: <strong>{pacienteAtual.nome_paciente}</strong>
        </p>
        <div className="modal-actions">
          <button onClick={onClose}>Cancelar</button>
          <button onClick={handleEnviarProximo}>
            {indiceAtual === selecionados.length - 1
              ? "Finalizar"
              : "Enviar e Próximo"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEnvioLote;
