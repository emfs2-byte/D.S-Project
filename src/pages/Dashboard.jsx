import React, { useState, useRef, useEffect } from 'react';
import { Search, Calendar as CalendarIcon, Settings, Plus, LogOut, Menu, CheckCircle2, ChevronDown, Clock, Printer, Send, XCircle } from 'lucide-react';
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
          <Menu className="text-slate-500 cursor-pointer hover:text-slate-800" size={24} />
          <div className="flex items-center gap-3">
            <div className="logo-circle"><span className="logo-letter">C</span></div>
            <div className="brand-text">
              <h1 className="brand-name">CliniDesk</h1>
              <span className="brand-tagline">Sua recepção, no controle</span>
            </div>
          </div>
        </div>
        <div className="user-actions">
          <div className="user-avatar">HJBC</div>
          <Settings className="text-slate-400 cursor-pointer hover:rotate-90 transition-transform duration-300" size={20} />
          <div className="logout-button"><LogOut size={18} /><span>Sair</span></div>
        </div>
      </header>

      <div className="main-actions-row">
        <div>
          <div className="title-with-badge">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Consultas do Dia — CliniDesk</h2>
            <div className="count-badge">{consultasFiltradas.length}</div>
          </div>
          <p className="text-slate-400 mt-2 font-semibold capitalize">
            {format(dataSelecionada, "eeee, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </p>
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

      <div className="filter-bar">
        <div className="search-input-group">
          <Search className="text-slate-400" size={20} />
          <input type="text" placeholder="Buscar por paciente ou telefone..." />
        </div>

        <div className="search-input-group date-picker-container" style={{ width: '224px', flex: 'none' }}>
          <CalendarIcon className="text-sky-500" size={20} />
          <DatePicker
            selected={dataSelecionada}
            onChange={(date) => setDataSelecionada(date)}
            locale="pt-BR"
            dateFormat="dd/MM/yyyy"
            className="datepicker-input" 
            popperPlacement="bottom-end"
          />
        </div>
        
        <div className="relative" ref={dropdownRef}>
          <div 
            className="search-input-group cursor-pointer hover:bg-slate-100 transition-colors" 
            style={{ width: '256px', flex: 'none', justifyContent: 'space-between' }}
            onClick={() => setIsSelectSetorOpen(!isSelectSetorOpen)}
          >
            <span className="text-sm font-bold text-slate-700">{setorSelecionado}</span>
            <ChevronDown size={14} className={`text-slate-400 transition-transform ${isSelectSetorOpen ? 'rotate-180' : ''}`} />
          </div>

          {isSelectSetorOpen && (
            <div className="absolute top-full right-0 mt-2 w-full bg-white border border-slate-100 rounded-xl shadow-xl z-50 overflow-hidden py-1">
              <div 
                className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-sky-50 hover:text-sky-600 transition-colors ${setorSelecionado === 'Todos os setores' ? 'bg-sky-50 text-sky-600 font-bold' : 'text-slate-600'}`}
                onClick={() => { setSetorSelecionado('Todos os setores'); setIsSelectSetorOpen(false); }}
              >
                Todos os setores
              </div>
              {clinicas.map((clinica, idx) => (
                <div 
                  key={idx}
                  className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-sky-50 hover:text-sky-600 transition-colors ${setorSelecionado === clinica.nome ? 'bg-sky-50 text-sky-600 font-bold' : 'text-slate-600'}`}
                  onClick={() => { setSetorSelecionado(clinica.nome); setIsSelectSetorOpen(false); }}
                >
                  {clinica.nome}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="table-container">
        <div className="table-header">
          <div>PACIENTE</div>
          <div>RESPONSÁVEL</div>
          <div>CONTATOS</div>
          <div>SETOR</div>
          <div>HORÁRIO</div>
          <div>STATUS</div>
          <div className="text-right">AÇÕES</div>
        </div>

        {consultasFiltradas.length === 0 ? (
          <div className="py-24 flex flex-col items-center justify-center opacity-40">
            <Search size={48} className="mb-4" />
            <p className="text-slate-500 text-sm font-bold italic">Nenhuma consulta encontrada para este filtro.</p>
          </div>
        ) : (
          consultasFiltradas.map((item, index) => {
            const horarioColor = getHorarioColor(item.data, item.horario);
            const usuarioLogado = "HJBC";
            const consultaOriginalIndex = consultas.findIndex(c => c === item);
            
            return (
              <div key={index} className="table-row group">
                <div className="text-slate-900 font-extrabold truncate">{item.paciente}</div>
                <div className="text-slate-500 font-semibold truncate">{item.responsavel}</div>
                <div className="text-slate-400 text-[11px] font-bold flex flex-col leading-tight">
                  <span>{item.telPaciente}</span>
                  <span className="opacity-60">{item.telResponsavel}</span>
                </div>
                <div className="flex items-center">
                  <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black border border-emerald-100 uppercase">
                    {item.setor}
                  </span>
                </div>
                
                {/* HORÁRIO COM COR DINÂMICA CORRIGIDA */}
                <div className="flex items-center">
                  <div className={`time-badge ${horarioColor}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      horarioColor === 'horario-atrasado' ? 'bg-red-500' : 
                      horarioColor === 'horario-proximo' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}></span>
                    {item.horario}
                  </div>
                </div>
                
                {/* 🔧 CORREÇÃO 3: STATUS COM ESTILO IGUAL À IMAGEM */}
                <div className="flex justify-center items-center">
                  {item.lembreteEnviadoPor ? (
                    <button
                      onClick={() => toggleLembrete(consultaOriginalIndex, usuarioLogado)}
                      className="status-circle status-circle-enviado"
                      title="Desmarcar lembrete"
                    >
                      <CheckCircle2 size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleLembrete(consultaOriginalIndex, usuarioLogado)}
                      className="status-circle status-circle-pendente"
                      title="Enviar lembrete"
                    >
                      <Send size={14} />
                    </button>
                  )}
                </div>
                
                {/* AÇÕES */}
                <div className="actions-cell">
                  <button 
                    className="btn-action btn-whatsapp"
                    onClick={() => alert(`WhatsApp para ${item.paciente}: ${item.telResponsavel}`)}
                  >
                    <FaWhatsapp size={16} />
                  </button>
                  <button 
                    className="btn-action btn-print"
                    onClick={() => imprimirTicket(item)}
                  >
                    <Printer size={14} />
                  </button>
                  <button
                    className="btn-action btn-delete"
                    onClick={() => {
                      if(window.confirm(`Excluir consulta de ${item.paciente}?`)) {
                        setConsultas(consultas.filter((c) => c !== item));
                      }
                    }}
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

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