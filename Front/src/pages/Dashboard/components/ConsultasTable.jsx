import { Search, CheckCircle2, CalendarClock, Pencil, Ban, Printer } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { getHorarioColor, getSetorColor } from '../../../lib/utils';
import { format } from 'date-fns';

const ConsultasTable = ({ 
  consultas, 
  abaAtiva, 
  onToggleLembrete, 
  onEditar, 
  onReagendar, 
  onCancelar, 
  onWhatsApp, 
  selecionados, 
  onToggleSelecao, 
  onSelecionarTodos 
}) => {

  const imprimirTicket = (consulta) => {
    const dataFormatada = format(new Date(consulta.data || consulta.dataRetorno || Date.now()), 'dd/MM/yyyy');
    const horarioImprimir = consulta.horarioRetorno || consulta.horario || '';
    const conteudo = `
      <html>
        <body onload="window.print(); window.close();">
          <h1>CliniDesk</h1>
          <p>Paciente: ${consulta.nome_paciente || ''}</p>
          <p>Data: ${dataFormatada} - ${horarioImprimir}</p>
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
  const enviarWhatsAppRetorno = (item) => {
    const telefone = item.telefone_paciente || item.telefone_responsavel || '';
    if (!telefone) {
      alert('Nenhum telefone encontrado para este paciente.');
      return;
    }

    const rawData = item.dataRetorno || item.data || '';
    const dataLimpa = rawData && rawData.includes('T') ? rawData.split('T')[0] : rawData;
    let dataRetornoBR = '';
    if (dataLimpa) {
      const parts = dataLimpa.split('-');
      if (parts.length === 3) {
        const [ano, mes, dia] = parts;
        dataRetornoBR = `${dia}/${mes}/${ano}`;
      } else {
        dataRetornoBR = dataLimpa;
      }
    }

    const horarioDoRetorno = item.horarioRetorno || item.horario || '';
    const setorDoRetorno = item.setorRetorno || item.setor || '';

    const mensagem = `Olá ${item.nome_paciente || ''}! Lembramos que seu retorno com ${setorDoRetorno} está marcado para ${dataRetornoBR} às ${horarioDoRetorno}. Núcleo de Apoio ao Idoso. Confirme sua presença!`;
    
    const link = `https://api.whatsapp.com/send?phone=55${telefone.replace(/\D/g, '')}&text=${encodeURIComponent(mensagem)}`;
    
    window.open(link, '_blank');
  };

  const todasSelecionadas = Array.isArray(consultas) && consultas.length > 0 && Array.isArray(selecionados) && selecionados.length === consultas.length;

  return (
    <div className="table-container">
      {/* Cabeçalho da tabela */}
      <div className="table-header">
        <div className="checkbox-cell">
          <input
            type="checkbox"
            className="checkbox-input"
            checked={todasSelecionadas}
            onChange={onSelecionarTodos}
          />
        </div>
        <div>PACIENTE</div>
        <div>RESPONSÁVEL</div>
        <div>CONTATOS</div>
        <div>SETOR</div>
        <div>HORÁRIO</div>
        <div className="center-header">STATUS</div>
        <div className="center-header">AÇÕES</div>
      </div>

      {/* Estado vazio */}
      {consultas.length === 0 ? (
        <div className="empty-state">
          <Search size={24} />
          <p>Nenhuma consulta encontrada para este filtro.</p>
        </div>
      ) : (
        consultas.map((item, index) => {
          const horarioExibido = abaAtiva === 'retornos' ? (item.horarioRetorno || item.horario) : item.horario;
          const setorExibido = abaAtiva === 'retornos' ? (item.setorRetorno || item.setor) : item.setor;

          const horarioColor = getHorarioColor(item.data || item.dataRetorno, horarioExibido);
          const setorColor = getSetorColor(setorExibido);

          const isSelecionado = Array.isArray(selecionados) && selecionados.some(s => {
            if (!s) return false;
            if (typeof s === 'string' || typeof s === 'number') return (s === item._id || s === item.id || s === item.telefone_paciente);
            return (s === item || (s._id && item._id && s._id === item._id) || (s.id && item.id && s.id === item.id));
          });

          const key = item._id || item.id || index;

          return (
            <div
              key={key}
              className={`table-row group ${item.lembrete_enviado_por ? 'lembrete-enviado' : ''} ${isSelecionado ? 'row-selecionada' : ''}`}
            >
              <div className="checkbox-cell">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  checked={isSelecionado}
                  onChange={() => onToggleSelecao(item)}
                />
              </div>
              <div className="patient-cell">
                <span className="patient-name-text">{item.nome_paciente}</span>
                {item.dataRetorno && (
                  <span className="badge-retorno">
                    Retorno Confirmado
                  </span>
                )}
              </div>
              <div className="resp-name">{item.responsavel}</div>
              <div className="contacts-cell">
                <span className="tel-paciente">{item.telefone_paciente}</span>
                <span className="tel-responsavel">{item.telefone_responsavel}</span>
              </div>
              <div>
                <span
                  className="sector-badge"
                  style={{ backgroundColor: setorColor.background, color: setorColor.color }}
                >
                  {setorExibido}
                </span>
              </div>
              <div>
                <span className={`time-badge ${horarioColor}`}>
                  {horarioColor === 'horario-atrasado' && (
                    <span className="alert-blink"></span>
                  )}
                  {horarioExibido}
                </span>
              </div>

              {/* Botão de lembrete */}
              <div className="status-cell">
                <button
                  onClick={() => onToggleLembrete(item, 'Sistema')}
                  className={`status-circle ${item.lembrete_enviado_por ? 'status-circle-enviado' : 'status-circle-pendente'}`}
                  title={item.lembrete_enviado_por ? 'Desmarcar lembrete' : 'Marcar como enviado'}
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
                <button 
                  className="btn-action btn-whatsapp" 
                  title="Enviar WhatsApp"
                  onClick={() => {
                    if (abaAtiva === 'consultas') {
                      // Se for a aba normal, executa a prop original que abre o Modal de escolha (index.jsx)
                      onWhatsApp(item); 
                    } else {
                      // Se for a aba de retornos, dispara o link direto com o texto customizado para retorno
                      enviarWhatsAppRetorno(item); 
                    }
                  }}
                >
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