import { Search, CheckCircle2, CalendarClock, Pencil, Ban } from 'lucide-react';
import { Printer } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { getHorarioColor, getSetorColor } from '../../../lib/utils';
import { format } from 'date-fns';

const ConsultasTable = ({
  consultas,
  onToggleLembrete,
  onEditar,
  onReagendar,
  onCancelar,
  onImprimir,
}) => {

  const imprimirTicket = (consulta) => {
    const dataFormatada = format(new Date(consulta.data), 'dd/MM/yyyy');
    const conteudo = `
      <html>
        <body onload="window.print(); window.close();">
          <h1>CliniDesk</h1>
          <p>Paciente: ${consulta.paciente}</p>
          <p>Data: ${dataFormatada} - ${consulta.horario}</p>
        </body>
      </html>
    `;
    const janela = window.open('', '_blank');
    if (!janela) {
      alert('Popup bloqueado. Permita popups para imprimir.');
      return;
    }
    janela.document.write(conteudo);
    janela.document.close();
  };

  return (
    <div className="table-container">
      {/* Cabeçalho da tabela */}
      <div className="table-header">
        <div>PACIENTE</div>
        <div>RESPONSÁVEL</div>
        <div>CONTATOS</div>
        <div>SETOR</div>
        <div>HORÁRIO</div>
        <div style={{ textAlign: 'center' }}>STATUS</div>
        <div style={{ textAlign: 'center' }}>AÇÕES</div>
      </div>

      {/* Estado vazio */}
      {consultas.length === 0 ? (
        <div className="empty-state">
          <Search size={24} />
          <p>Nenhuma consulta encontrada para este filtro.</p>
        </div>
      ) : (
        consultas.map((item, index) => {
          const horarioColor = getHorarioColor(item.data, item.horario);
          const setorColor = getSetorColor(item.setor);

          return (
            <div
              key={index}
              className={`table-row group ${item.lembreteEnviadoPor ? 'lembrete-enviado' : ''}`}
            >
              <div className="patient-name">{item.paciente}</div>
              <div className="resp-name">{item.responsavel}</div>
              <div className="contacts-cell">
                <span className="tel-paciente">{item.telPaciente}</span>
                <span className="tel-responsavel">{item.telResponsavel}</span>
              </div>
              <div>
                <span
                  className="sector-badge"
                  style={{ backgroundColor: setorColor.background, color: setorColor.color }}
                >
                  {item.setor}
                </span>
              </div>
              <div>
                <span className={`time-badge ${horarioColor}`}>
                  {horarioColor === 'horario-atrasado' && (
                    <span className="alert-blink"></span>
                  )}
                  {item.horario}
                </span>
              </div>

              {/* Botão de lembrete */}
              <div className="status-cell">
                <button
                  onClick={() => onToggleLembrete(index, 'Sistema')}
                  className={`status-circle ${item.lembreteEnviadoPor ? 'status-circle-enviado' : 'status-circle-pendente'}`}
                  title={item.lembreteEnviadoPor ? 'Desmarcar lembrete' : 'Marcar como enviado'}
                >
                  <CheckCircle2 size={18} strokeWidth={3} />
                </button>
              </div>

              {/* Botões de ação */}
              <div className="actions-cell">
                <button className="btn-action" title="Reagendar" onClick={() => onReagendar(item)}>
                  <CalendarClock size={15} />
                </button>
                <button className="btn-action" title="Editar dados" onClick={() => onEditar(item)}>
                  <Pencil size={15} />
                </button>
                <button className="btn-action btn-whatsapp" onClick={() => alert(`WhatsApp para ${item.paciente}`)}>
                  <FaWhatsapp size={16} />
                </button>
                <button className="btn-action btn-print" onClick={() => imprimirTicket(item)}>
                  <Printer size={14} />
                </button>
                <button className="btn-action btn-delete" title="Cancelar" onClick={() => onCancelar(item)}>
                  <Ban size={15} />
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ConsultasTable;