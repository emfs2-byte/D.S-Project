import React, { useState, useRef, useEffect } from 'react';
import {
  Search, Calendar as CalendarIcon, Settings, Plus, LogOut, Menu, CheckCircle2, ChevronDown, Clock, Printer, Send, XCircle, CalendarClock,
  Pencil, Ban, User
} from 'lucide-react';
import CliniDeskLogo from "../Components/Login/CliniDeskLogo";
import ModalNovoAgendamento from '../Components/Modals/ModalNovoAgendamento';
import ModalGerenciarClinicas from '../Components/Modals/ModalGerenciarClinicas';
import ModalConfirmarCancelamento from '../Components/Modals/ModalConfirmarCancelamento';
import '../styles/Dashboard.css';
import { FaWhatsapp, FaPrint, FaTrash } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import { registerLocale } from "react-datepicker";
import ptBR from 'date-fns/locale/pt-BR';
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO, differenceInMinutes, isAfter, isSameDay, setHours, setMinutes } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import ModalPerfil from '../Components/Modals/ModalPerfil';
import ModalEditarConsulta from '../Components/Modals/ModalEditarConsulta';
import ModalReagendarConsulta from '../Components/Modals/ModalReagendarConsulta';
import ProntuarioDigital from '../Components/Prontuario/ProntuarioDigital';

registerLocale('pt-BR', ptBR);

// --- Passo 1: Função utilitária para formatar datas (Evita Duplicated Code) ---
const formatarDataBR = (data) => {
  if (!data) return '';
  // Garante que funciona tanto com strings ("2026-04-21") quanto com objetos Date
  const dataObj = data instanceof Date ? data : new Date(data);
  return format(dataObj, 'dd/MM/yyyy');
};

// --- Passo 3: Constantes para evitar Magic Strings ---
const SETORES = {
  GERIATRIA: "Geriatria",
  CLINICA_MEDICA: "Clínica Médica",
  ENFERMAGEM: "Enfermagem",
  NUTRICAO: "Nutrição",
  PSICOLOGIA: "Psicologia",
  SERVICO_SOCIAL: "Serviço Social",
  FISIOTERAPIA: "Fisioterapia",
  TERAPIA_OCUPACIONAL: "Terapia Ocupacional",
  FONOAUDIOLOGIA: "Fonoaudiologia",
  ODONTO: "Odonto"
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalNovoOpen, setIsModalNovoOpen] = useState(false);
  const [isModalClinicasOpen, setIsModalClinicasOpen] = useState(false);
  const [isModalPerfilOpen, setIsModalPerfilOpen] = useState(false);
  const [isSelectSetorOpen, setIsSelectSetorOpen] = useState(false);
  const [setorSelecionado, setSetorSelecionado] = useState('Todos os setores');
  const dropdownRef = useRef(null);
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null); 

  // Função para deslogar
  const handleLogout = () => {
    navigate('/');
  };
  
  // Função para abrir o prontuário 
  const abrirProntuario = (paciente) => {
    setPacienteSelecionado(paciente);
  };

  const [consultas, setConsultas] = useState([
    {
      paciente: "Maria Silva",
      responsavel: "João Silva",
      telPaciente: "+55 (11) 99999-0001",
      telResponsavel: "+55 (11) 98888-0001",
      setor: SETORES.GERIATRIA,
      data: "2026-04-21",
      horario: "07:00",
      status: "✔",
      lembreteEnviadoPor: null,
      lembreteEnviadoEm: null
    },
    {
      paciente: "Pedro Santos",
      responsavel: "Ana Santos",
      telPaciente: "+55 (11) 99999-0002",
      telResponsavel: "+55 (11) 98888-0002",
      setor: SETORES.CLINICA_MEDICA,
      data: "2026-04-21",
      horario: "14:00",
      status: "✔",
      lembreteEnviadoPor: null,
      lembreteEnviadoEm: null
    },
    {
      paciente: "Luísa Oliveira",
      responsavel: "Carlos Oliveira",
      telPaciente: "-",
      telResponsavel: "+55 (11) 98888-0003",
      setor: SETORES.NUTRICAO,
      data: "2026-04-21",
      horario: "05:30",
      status: "✔",
      lembreteEnviadoPor: null,
      lembreteEnviadoEm: null
    }
  ]);

  const [clinicas, setClinicas] = useState([
    { nome: SETORES.GERIATRIA, fixa: true },
    { nome: SETORES.CLINICA_MEDICA, fixa: true },
    { nome: SETORES.ENFERMAGEM, fixa: true },
    { nome: SETORES.NUTRICAO, fixa: true },
    { nome: SETORES.PSICOLOGIA, fixa: true },
    { nome: SETORES.SERVICO_SOCIAL, fixa: true },
    { nome: SETORES.FISIOTERAPIA, fixa: true },
    { nome: SETORES.TERAPIA_OCUPACIONAL, fixa: true },
    { nome: SETORES.FONOAUDIOLOGIA, fixa: true },
    { nome: SETORES.ODONTO, fixa: true }
  ]);

  const [consultaParaCancelar, setConsultaParaCancelar] = useState(null);
  
  const abrirModalCancelamento = (consulta) => {
    setConsultaParaCancelar(consulta);
  };

  const confirmarCancelamento = () => {
    if (consultaParaCancelar) {
      setConsultas(consultas.filter(c => c !== consultaParaCancelar));
      setConsultaParaCancelar(null);
    }
  };

  const fecharModalCancelamento = () => {
    setConsultaParaCancelar(null);
  };

  const [dataSelecionada, setDataSelecionada] = useState(new Date());

  const [isModalEditarOpen, setIsModalEditarOpen] = useState(false);
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);

  const abrirEditarConsulta = (consulta) => {
    setConsultaSelecionada(consulta);
    setIsModalEditarOpen(true);
  };

  const salvarEdicao = (consultaEditada) => {
    const novasConsultas = consultas.map(c => 
      c === consultaSelecionada ? consultaEditada : c
    );
    setConsultas(novasConsultas);
    setIsModalEditarOpen(false);
    setConsultaSelecionada(null);
  };

  const [isModalReagendarOpen, setIsModalReagendarOpen] = useState(false);

  const abrirReagendarConsulta = (consulta) => {
    setConsultaSelecionada(consulta);
    setIsModalReagendarOpen(true);
  };

  const salvarReagendamento = (consultaReagendada) => {
    const novasConsultas = consultas.map(c => 
      c === consultaSelecionada ? consultaReagendada : c
    );
    setConsultas(novasConsultas);
    setIsModalReagendarOpen(false);
    setConsultaSelecionada(null);
  };

  const getHorarioColor = (dataConsulta, horarioConsulta) => {
    const [ano, mes, dia] = dataConsulta.split('-');
    const [hora, minuto] = horarioConsulta.split(':');
    const dataHoraConsulta = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia), parseInt(hora), parseInt(minuto));
    const agora = new Date();
    const diferencaMinutos = differenceInMinutes(dataHoraConsulta, agora);

    if (diferencaMinutos < 0) return 'horario-atrasado';
    else if (diferencaMinutos <= 60) return 'horario-proximo';
    else return 'horario-normal';
  };

  const toggleLembrete = (index, nomeUsuario) => {
    const novasConsultas = [...consultas];
    const consulta = novasConsultas[index];

    if (consulta.lembreteEnviadoPor) {
      consulta.lembreteEnviadoPor = null;
      consulta.lembreteEnviadoEm = null;
    } else {
      consulta.lembreteEnviadoPor = nomeUsuario;
      consulta.lembreteEnviadoEm = new Date().toLocaleString();
    }
    setConsultas(novasConsultas);
  };

  const imprimirTicket = (consulta) => {
    // Usando a função utilitária refatorada
    const dataFormatada = formatarDataBR(consulta.data);
    const conteudoTicket = `
      <html>
        <body onload="window.print(); window.close();">
          <h1>CliniDesk</h1>
          <p>Paciente: ${consulta.paciente}</p>
          <p>Data: ${dataFormatada} - ${consulta.horario}</p>
        </body>
      </html>
    `;
    const janela = window.open('', '_blank');
    janela.document.write(conteudoTicket);
    janela.document.close();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSelectSetorOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const consultasFiltradas = consultas.filter(consulta => {
    // Usando a função utilitária refatorada
    const dataFormatada = formatarDataBR(dataSelecionada);
    // Nota de refatoração: se consulta.data estiver em formato ISO "YYYY-MM-DD", 
    // a comparação com dataFormatada "DD/MM/YYYY" poderá falhar. 
    // Certifique-se de que a gravação/leitura estão no mesmo formato esperado.
    const matchesData = consulta.data === dataFormatada;
    const matchesSetor = setorSelecionado === 'Todos os setores' || consulta.setor === setorSelecionado;
    return matchesData && matchesSetor;
  });

  // Função refatorada para usar a constante SETORES
  const getSetorColor = (setor) => {
    const configuracaoCores = {
      [SETORES.GERIATRIA]: { background: "#dcfce7", color: "#166534" },
      [SETORES.CLINICA_MEDICA]: { background: "#dbeafe", color: "#1e40af" },
      [SETORES.ENFERMAGEM]: { background: "#fef3c7", color: "#92400e" },
      [SETORES.NUTRICAO]: { background: "#fed7aa", color: "#9a3412" },
      [SETORES.PSICOLOGIA]: { background: "#e0e7ff", color: "#3730a3" },
      [SETORES.SERVICO_SOCIAL]: { background: "#fce7f3", color: "#9d174d" },
      [SETORES.FISIOTERAPIA]: { background: "#ccfbf1", color: "#115e59" },
      [SETORES.TERAPIA_OCUPACIONAL]: { background: "#ede9fe", color: "#5b21b6" },
      [SETORES.FONOAUDIOLOGIA]: { background: "#cffafe", color: "#155e75" },
      [SETORES.ODONTO]: { background: "#fef9c3", color: "#713f12" }
    };
    
    return configuracaoCores[setor] || { background: "#f1f5f9", color: "#475569" };
  };

  return (
    <div className="dashboard-container">

      {/* --- MENU LATERAL (SIDEBAR) --- */}
      <div
        className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`}
        onClick={() => setIsSidebarOpen(false)}
      >
        <aside
          className={`sidebar-menu ${isSidebarOpen ? 'open' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sidebar-header">
            <div className="user-info-sidebar">
              <div className="user-avatar-large">HJ</div>
              <div>
                <h3>HJBC</h3>
                <p>CliniDesk • Recepcionista</p>
              </div>
            </div>
            <button className="close-sidebar" onClick={() => setIsSidebarOpen(false)}>
              <XCircle size={24} />
            </button>
          </div>

          <nav className="sidebar-nav">
            <button
              className="nav-item active"
              onClick={() => {
                setIsModalPerfilOpen(true);
                setIsSidebarOpen(false); // Fecha a sidebar ao abrir o modal
              }}
            >
              <User size={18} /> Perfil
            </button>
            <button className="nav-item">
              <Settings size={18} /> Configurações
            </button>
          </nav>

          <button className="sidebar-logout" onClick={handleLogout}>
            <LogOut size={18} /> Sair
          </button>
        </aside>
      </div>

      <header className="dashboard-header">
        <div className="brand-group">
          {/* Menu Icone que abre o Sidebar */}
          <Menu
            size={24}
            className="menu-handle"
            onClick={() => setIsSidebarOpen(true)}
            style={{ cursor: 'pointer' }}
          />

          <div style={{
            transform: 'scale(0.55)',
            transformOrigin: 'left center',
            marginBottom: '-25px',
            marginTop: '-15px'
          }}>
            <CliniDeskLogo isFormHeader={true} />
          </div>
        </div>

        <div className="user-actions">
          <div className="user-avatar"></div>
          {/* Botão Sair com funcionalidade */}
          <div className="logout-button" onClick={handleLogout} style={{ cursor: 'pointer' }}>
            <LogOut size={18} /><span>Sair</span>
          </div>
        </div>
      </header>

      {/* --- LINHA DE TÍTULO E BOTÕES --- */}
      <div className="main-actions-row">
        <div className="title-section">
          <div className="title-with-badge">
            <h1 className="brand-title">Consultas do Dia — CliniDesk</h1>
            <div className="count-badge">{consultasFiltradas.length}</div>
          </div>
          <h2 className="brand-subtitle">
            {format(dataSelecionada, "eeee, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </h2>
        </div>
        <div className="action-buttons">
          <button onClick={() => setIsModalClinicasOpen(true)} className="btn-clinicas">
            <Settings size={18} /> <span>Clínicas</span>
          </button>
          <button onClick={() => setIsModalNovoOpen(true)} className="btn-novo">
            <Plus size={20} /> <span>Novo</span>
          </button>
        </div>
      </div>

      {/* --- BARRA DE FILTROS --- */}
      <div className="filter-bar">
        <div className="search-input-group">
          <Search size={20} />
          <input type="text" placeholder="Buscar por paciente ou telefone..." />
        </div>

        <div className="search-input-group date-picker-container" style={{ width: '200px' }}>
          <CalendarIcon size={20} />
          <DatePicker
            selected={dataSelecionada}
            onChange={(date) => setDataSelecionada(date)}
            locale="pt-BR"
            dateFormat="dd/MM/yyyy"
            className="datepicker-input"
          />
        </div>

        <div className="relative" ref={dropdownRef} style={{ width: '200px' }}>
          <div
            className="search-input-group cursor-pointer trigger-setor"
            onClick={() => setIsSelectSetorOpen(!isSelectSetorOpen)}
          >
            <span>{setorSelecionado}</span>
            <ChevronDown size={14} />
          </div>

          {isSelectSetorOpen && (
            <div className="dropdown-menu-setor">
              <div onClick={() => { setSetorSelecionado('Todos os setores'); setIsSelectSetorOpen(false); }}>Todos os setores</div>
              {clinicas.map((clinica, idx) => (
                <div key={idx} onClick={() => { setSetorSelecionado(clinica.nome); setIsSelectSetorOpen(false); }}>{clinica.nome}</div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* --- TABELA DE CONSULTAS --- */}
      <div className="table-container">
        <div className="table-header">
          <div>PACIENTE</div>
          <div>RESPONSÁVEL</div>
          <div>CONTATOS</div>
          <div>SETOR</div>
          <div>HORÁRIO</div>
          <div style={{ textAlign: 'center' }}>STATUS</div>
          <div style={{ textAlign: 'center' }}>AÇÕES</div>
        </div>

        {consultasFiltradas.length === 0 ? (
          <div className="empty-state">
            <Search size={24} />
            <p>Nenhuma consulta encontrada para este filtro.</p>
          </div>
        ) : (
          consultasFiltradas.map((item, index) => {
            const horarioColor = getHorarioColor(item.data, item.horario);
            const consultaOriginalIndex = consultas.findIndex(c => c === item);
            const handleWhatsApp = (item) => {
            const telefoneBruto = item.telPaciente || ""; 
            const numeroLimpo = String(telefoneBruto).replace(/\D/g, '');

            if (!numeroLimpo) {
                alert("Este paciente não possui um número de telefone cadastrado.");
                return;
            }

            // Pega os dados da consulta 
            const setor = item.setor || 'nossa clínica';
            const dataConsulta = item.data || 'sua data agendada';
            const horaConsulta = item.horario || 'seu horário agendado';

            // Mensagem de envio no whatszapp
            const mensagem = `Olá, ${item.paciente}! Sua consulta no setor de ${setor} está confirmada para o dia ${dataConsulta} às ${horaConsulta}.`;
            
            const url = `https://wa.me/55${numeroLimpo}?text=${encodeURIComponent(mensagem)}`;

            // Abre a aba do WhatsApp
            window.open(url, '_blank');
        };
            return (
              <div key={index} className={`table-row group ${item.lembreteEnviadoPor ? 'lembrete-enviado' : ''}`}>
                <div className="patient-name">{item.paciente}</div>
                <div className="resp-name">{item.responsavel}</div>
                <div className="contacts-cell">
                  <span className="tel-paciente">{item.telPaciente}</span>
                  <span className="tel-responsavel">{item.telResponsavel}</span>
                </div>
                <div>
                  <span 
                    className="sector-badge"
                    style={{
                      backgroundColor: getSetorColor(item.setor).background,
                      color: getSetorColor(item.setor).color
                    }}
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

                <div className="status-cell">
                  <button
                    onClick={() => toggleLembrete(consultaOriginalIndex, "HJBC")}
                    className={`status-circle ${item.lembreteEnviadoPor ? 'status-circle-enviado' : 'status-circle-pendente'}`}
                    title={item.lembreteEnviadoPor ? "Desmarcar lembrete" : "Marcar como enviado"}
                  >
                    <CheckCircle2 size={18} strokeWidth={3} />
                  </button>
                </div>

                <div className="actions-cell">
                  {/* BOTÃO PRONTUÁRIO */}
                  <button 
                    className="btn-action" 
                    title="Ver Prontuário"
                    onClick={() => abrirProntuario(item)}
                  >
                    📋
                  </button>
                  <button 
                    className="btn-action" 
                    title="Reagendar"
                    onClick={() => abrirReagendarConsulta(item)}
                  >
                    <CalendarClock size={15} />
                  </button>
                  <button 
                    className="btn-action" 
                    title="Editar dados"
                    onClick={() => abrirEditarConsulta(item)}
                  >
                    <Pencil size={15} />
                  </button>
                  <button className="btn-action btn-whatsapp" onClick={() => handleWhatsApp(item)}><FaWhatsapp size={16} /></button>
                  <button className="btn-action btn-print" onClick={() => imprimirTicket(item)}><Printer size={14} /></button>
                  <button 
                    className="btn-action btn-delete" 
                    title="Cancelar Consulta"
                    onClick={() => abrirModalCancelamento(item)}
                  >
                    <Ban size={15} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* --- MODAIS --- */}
      {isModalNovoOpen && (
        <ModalNovoAgendamento
          onClose={() => setIsModalNovoOpen(false)}
          clinicas={clinicas}
          onSave={(novoDado) => {
            setConsultas([...consultas, { ...novoDado, lembreteEnviadoPor: null, lembreteEnviadoEm: null }]);
            setIsModalNovoOpen(false);
          }}
        />
      )}

      {isModalClinicasOpen && (
        <ModalGerenciarClinicas
          onClose={() => setIsModalClinicasOpen(false)}
          clinicas={clinicas}
          setClinicas={setClinicas}
        />
      )}
      
      <ModalPerfil
        isOpen={isModalPerfilOpen}
        onClose={() => setIsModalPerfilOpen(false)}
        onLogout={handleLogout}
      />
      {consultaParaCancelar && (
        <ModalConfirmarCancelamento
          consulta={consultaParaCancelar}
          onClose={fecharModalCancelamento}
          onConfirm={confirmarCancelamento}
        />
      )}

     {/* MODAL DE EDIÇÃO */}
      {isModalEditarOpen && consultaSelecionada && (
        <ModalEditarConsulta
          onClose={() => {
            setIsModalEditarOpen(false);
            setConsultaSelecionada(null);
          }}
          onSave={salvarEdicao}
          consulta={consultaSelecionada}
          clinicas={clinicas}
        />
      )}

      {/* MODAL DE REAGENDAMENTO */}
      {isModalReagendarOpen && consultaSelecionada && (
        <ModalReagendarConsulta
          onClose={() => {
            setIsModalReagendarOpen(false);
            setConsultaSelecionada(null);
          }}
          onSave={salvarReagendamento}
          consulta={consultaSelecionada}
        />
      )}

      {/* MODAL DO PRONTUÁRIO DIGITAL */}
      {pacienteSelecionado && (
        <div className="modal-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 1000,
          overflow: 'auto'
        }}>
          <div style={{
            position: 'relative',
            maxWidth: '800px',
            margin: '2rem auto',
            background: 'white',
            borderRadius: '12px',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <button
              onClick={() => setPacienteSelecionado(null)}
              style={{
                position: 'sticky',
                top: '1rem',
                right: '1rem',
                float: 'right',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                margin: '1rem',
                zIndex: 10
              }}
            >
              ✕
            </button>
            <ProntuarioDigital
              pacienteId={pacienteSelecionado.paciente}
              pacienteNome={pacienteSelecionado.paciente}
              setorAtual={pacienteSelecionado.setor}
            />
          </div>
        </div>
      )}

    </div>

  );
};

export default Dashboard;