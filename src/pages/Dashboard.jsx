import React, { useState, useRef, useEffect } from 'react';
import { Search, Calendar as CalendarIcon, Settings, Plus, LogOut, Menu, CheckCircle2, ChevronDown, Clock, Printer, Send, XCircle,CalendarClock, 
  Pencil, Ban } from 'lucide-react';
import CliniDeskLogo from "../Components/Login/CliniDeskLogo";
import ModalNovoAgendamento from '../Components/Modals/ModalNovoAgendamento';
import ModalGerenciarClinicas from '../Components/Modals/ModalGerenciarClinicas';
import '../styles/Dashboard.css'; 
import { FaWhatsapp, FaPrint, FaTrash } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import { registerLocale } from "react-datepicker";
import ptBR from 'date-fns/locale/pt-BR';
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO, differenceInMinutes, isAfter, isSameDay, setHours, setMinutes } from 'date-fns';

registerLocale('pt-BR', ptBR);

const Dashboard = () => {
  const [isModalNovoOpen, setIsModalNovoOpen] = useState(false);
  const [isModalClinicasOpen, setIsModalClinicasOpen] = useState(false);
  
  const [isSelectSetorOpen, setIsSelectSetorOpen] = useState(false);
  const [setorSelecionado, setSetorSelecionado] = useState('Todos os setores');
  const dropdownRef = useRef(null);

  const [consultas, setConsultas] = useState([
    {
      paciente: "Maria Silva",
      responsavel: "João Silva",
      telPaciente: "+55 (11) 99999-0001",
      telResponsavel: "+55 (11) 98888-0001",
      setor: "Geriatria",
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
      setor: "Clínica Médica",
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
      setor: "Nutrição",
      data: "2026-04-21",
      horario: "05:30",
      status: "✔",
      lembreteEnviadoPor: null,
      lembreteEnviadoEm: null
    }
  ]);

  const [clinicas, setClinicas] = useState([
    { nome: "Geriatria", fixa: true },
    { nome: "Clínica Médica", fixa: true },
    { nome: "Enfermagem", fixa: true },
    { nome: "Nutrição", fixa: true }, 
    { nome: "Psicologia", fixa: true }, 
    { nome: "Serviço Social", fixa: true }, 
    { nome: "Fisioterapia", fixa: true }, 
    { nome: "Terapia Ocupacional", fixa: true },
    { nome: "Fonoaudiologia", fixa: true }, 
    { nome: "Odonto", fixa: true }
  ]);

  const [dataSelecionada, setDataSelecionada] = useState(new Date());

  // 🔧 CORREÇÃO 1: FUNÇÃO CORRIGIDA PARA CORES DO HORÁRIO
  const getHorarioColor = (dataConsulta, horarioConsulta) => {
    // Converte a data da consulta para objeto Date
    const [ano, mes, dia] = dataConsulta.split('-');
    const [hora, minuto] = horarioConsulta.split(':');
    
    // Cria a data/hora COMPLETA da consulta
    const dataHoraConsulta = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia), parseInt(hora), parseInt(minuto));
    
    // Data/hora atual
    const agora = new Date();
    
    // Calcula diferença em minutos
    const diferencaMinutos = differenceInMinutes(dataHoraConsulta, agora);
    
    // 🔴 VERMELHO: Já passou do horário
    if (diferencaMinutos < 0) {
      return 'horario-atrasado';
    } 
    // 🟡 AMARELO: Menos de 60 minutos (1 hora)
    else if (diferencaMinutos <= 60) {
      return 'horario-proximo';
    } 
    // 🔵 AZUL: Mais de 60 minutos
    else {
      return 'horario-normal';
    }
  };

  // 🔧 CORREÇÃO 2: FUNÇÃO PARA ENVIAR/DESMARCAR LEMBRETE
  const toggleLembrete = (index, nomeUsuario) => {
    const novasConsultas = [...consultas];
    const consulta = novasConsultas[index];
    
    if (consulta.lembreteEnviadoPor) {
      // DESMARCAR - sem confirmação, sem alerta
      consulta.lembreteEnviadoPor = null;
      consulta.lembreteEnviadoEm = null;
      setConsultas(novasConsultas);
    } else {
      // MARCAR - sem alerta
      consulta.lembreteEnviadoPor = nomeUsuario;
      consulta.lembreteEnviadoEm = new Date().toLocaleString();
      setConsultas(novasConsultas);
    }
  };

  // FUNÇÃO PARA IMPRIMIR TICKET
  const imprimirTicket = (consulta) => {
    const dataFormatada = format(new Date(consulta.data), 'dd/MM/yyyy');
    
    const conteudoTicket = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Lembrete de Consulta - CliniDesk</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: #f5f5f5;
          }
          .ticket {
            max-width: 400px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          .ticket-header {
            background: linear-gradient(135deg, #0061f2 0%, #0091ff 100%);
            color: white;
            padding: 20px;
            text-align: center;
          }
          .ticket-header h1 {
            margin: 0;
            font-size: 24px;
          }
          .ticket-header p {
            margin: 5px 0 0;
            opacity: 0.9;
          }
          .ticket-body {
            padding: 20px;
          }
          .info-row {
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid #eee;
          }
          .info-label {
            font-size: 12px;
            color: #666;
            text-transform: uppercase;
            font-weight: bold;
            margin-bottom: 5px;
          }
          .info-value {
            font-size: 16px;
            color: #333;
            font-weight: 500;
          }
          .ticket-footer {
            background: #f8f9fa;
            padding: 15px;
            text-align: center;
            font-size: 10px;
            color: #666;
            border-top: 1px solid #eee;
          }
          @media print {
            body { background: white; padding: 0; }
            .ticket { box-shadow: none; margin: 0; }
          }
        </style>
      </head>
      <body>
        <div class="ticket">
          <div class="ticket-header">
            <h1>CliniDesk</h1>
            <p>Lembrete de Consulta</p>
          </div>
          <div class="ticket-body">
            <div class="info-row">
              <div class="info-label">PACIENTE</div>
              <div class="info-value">${consulta.paciente}</div>
            </div>
            <div class="info-row">
              <div class="info-label">DATA</div>
              <div class="info-value">${dataFormatada}</div>
            </div>
            <div class="info-row">
              <div class="info-label">HORÁRIO</div>
              <div class="info-value">${consulta.horario}</div>
            </div>
            <div class="info-row">
              <div class="info-label">SETOR</div>
              <div class="info-value">${consulta.setor}</div>
            </div>
            <div class="info-row">
              <div class="info-label">RESPONSÁVEL</div>
              <div class="info-value">${consulta.responsavel}</div>
            </div>
          </div>
          <div class="ticket-footer">
            Documento gerado pelo CliniDesk — Sistema de Gestão Clínica
          </div>
        </div>
        <script>
          window.print();
          setTimeout(() => { window.close(); }, 100);
        </script>
      </body>
      </html>
    `;
    
    const janelaImpressao = window.open('', '_blank');
    janelaImpressao.document.write(conteudoTicket);
    janelaImpressao.document.close();
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
    const dataFormatada = format(dataSelecionada, 'yyyy-MM-dd');
    const matchesData = consulta.data === dataFormatada;
    const matchesSetor = setorSelecionado === 'Todos os setores' || consulta.setor === setorSelecionado;
    return matchesData && matchesSetor;
  });

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="brand-group">
          {/* Menu Icone (Lucide) */}
          <Menu size={24} className="menu-handle" />

          <div style={{ 
            transform: 'scale(0.55)', 
            transformOrigin: 'left center', 
            marginBottom: '-25px', // Ajusta o respiro vertical
            marginTop: '-15px'     // Sobe um pouco para alinhar com o menu
          }}>
            <CliniDeskLogo isFormHeader={true} />
          </div>
      
        </div>
        <div className="user-actions">
          <div className="user-avatar">HJBC</div>
          {/* Settings Icon (Lucide) */}
          <Settings size={20} className="user-settings-icon" />
          <div className="logout-button"><LogOut size={18} /><span>Sair</span></div>
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

      {/* --- BARRA DE FILTROS (Correção de Layout) --- */}
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

      {/* --- TABELA DE CONSULTAS (Fiel à referência) --- */}
      <div className="table-container">
        <div className="table-header">
          <div>PACIENTE</div>
          <div>RESPONSÁVEL</div>
          <div>CONTATOS</div>
          <div>SETOR</div>
          <div>HORÁRIO</div>
          <div style={{textAlign: 'center'}}>STATUS</div>
          <div style={{textAlign: 'center'}}>AÇÕES</div>
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
            
            return (
              <div key={index} className="table-row group">
                <div className="patient-name">{item.paciente}</div>
                <div className="resp-name">{item.responsavel}</div>
                <div className="contacts-cell">
                  <span>{item.telPaciente}</span>
                  <span className="sub-contact">{item.telResponsavel}</span>
                </div>
                <div><span className="sector-badge">{item.setor}</span></div>
                <div><span className={`time-badge ${horarioColor}`}>{item.horario}</span></div>
                
                {/* --- MUDANÇA AQUI: ÍCONE DE CHECK MARK --- */}
                <div className="status-cell">
                  <button
                    onClick={() => toggleLembrete(consultaOriginalIndex, "HJBC")}
                    className={`status-circle ${item.lembreteEnviadoPor ? 'status-circle-enviado' : 'status-circle-pendente'}`}
                    title={item.lembreteEnviadoPor ? "Desmarcar lembrete" : "Marcar como enviado"}
                  >
                    {/* Ícone único: a cor e o fundo serão controlados pelo CSS via classes */}
                    <CheckCircle2 size={18} strokeWidth={3}/>
                  </button>
                </div>
                
                <div className="actions-cell">
                    {/* 1. REAGENDAR (Novo) */}
                  <button 
                    className="btn-action" 
                    title="Reagendar"
                    onClick={() => console.log("Abrir modal de reagendamento")}
                  >
                    <CalendarClock size={15} />
                  </button>

                  {/* 2. EDITAR (Novo) */}
                  <button 
                    className="btn-action" 
                    title="Editar dados"
                    onClick={() => console.log("Abrir modal de edição")}
                  >
                    <Pencil size={15} />
                  </button>

                  {/* 3. WHATSAPP (Já existia) */}
                  <button 
                    className="btn-action btn-whatsapp"
                    onClick={() => alert(`WhatsApp para ${item.paciente}: ${item.telResponsavel}`)}
                  >
                    <FaWhatsapp size={16} />
                  </button>

                  {/* 4. IMPRIMIR (Já existia) */}
                  <button 
                    className="btn-action btn-print"
                    onClick={() => imprimirTicket(item)}
                  >
                    <Printer size={14} />
                  </button>

                  {/* 5. CANCELAR (Troquei o FaTrash pelo Ban para ficar mais "clínico") */}
                  <button
                    className="btn-action btn-delete"
                    title="Cancelar Consulta"
                    onClick={() => {/* função de deletar */}}
                  >
                    <Ban size={15} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* --- MODAIS (Mantenha aqui) --- */}
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
    </div>
  );
};
export default Dashboard;