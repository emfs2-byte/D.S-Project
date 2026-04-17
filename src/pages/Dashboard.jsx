import React, { useState, useRef, useEffect } from 'react';
import { Search, Calendar as CalendarIcon, Settings, Plus, LogOut, Menu, CheckCircle2, ChevronDown } from 'lucide-react';
import ModalNovoAgendamento from '../Components/Modals/ModalNovoAgendamento';
import ModalGerenciarClinicas from '../Components/Modals/ModalGerenciarClinicas';
import '../styles/Dashboard.css'; 
import { FaWhatsapp, FaPrint, FaTrash } from 'react-icons/fa';

// Importações para o Calendário
import DatePicker from 'react-datepicker';
import { registerLocale } from "react-datepicker";
import ptBR from 'date-fns/locale/pt-BR';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';

registerLocale('pt-BR', ptBR);

const Dashboard = () => {
  const [isModalNovoOpen, setIsModalNovoOpen] = useState(false);
  const [isModalClinicasOpen, setIsModalClinicasOpen] = useState(false);
  
  // ESTADOS PARA O FILTRO DE SETORES
  const [isSelectSetorOpen, setIsSelectSetorOpen] = useState(false);
  const [setorSelecionado, setSetorSelecionado] = useState('Todos os setores');
  const dropdownRef = useRef(null);

  const [consultas, setConsultas] = useState([]);
  const [dataSelecionada, setDataSelecionada] = useState(new Date());

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

  // FECHAR DROPDOWN AO CLICAR FORA
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSelectSetorOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // LÓGICA DE FILTRAGEM DUPLA (DATA + SETOR)
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
          <div className="user-avatar">JW</div>
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
        
        {/* DROPDOWN DE SETORES ESTILIZADO E DINÂMICO */}
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
          consultasFiltradas.map((item, index) => (
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
              <div className="flex items-center">
                <div className="time-badge">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  {item.horario}
                </div>
              </div>
              <div className="flex justify-center items-center status-indicator">
                <CheckCircle2 size={18} />
              </div>
              <div className="actions-cell">
                <button className="btn-action btn-whatsapp"><FaWhatsapp size={16} /></button>
                <button className="btn-action btn-print"><FaPrint size={14} /></button>
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
          ))
        )}
      </div>

      {/* MODAIS */}
      {isModalNovoOpen && (
        <ModalNovoAgendamento
          onClose={() => setIsModalNovoOpen(false)}
          clinicas={clinicas}
          onSave={(novoDado) => {
            setConsultas([...consultas, novoDado]);
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