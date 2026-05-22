import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import { format } from 'date-fns';
import { useConsultas } from './hooks/useConsultas';
import HeaderDashboard from './components/HeaderDashboard';
import FiltroBar from './components/FiltroBar';
import ConsultasTable from './components/ConsultasTable';
import { useClinicas } from '../../contexts/ClinicasContext';
import ModalNovoAgendamento from '../../Components/Modals/ModalNovoAgendamento';
import ModalGerenciarClinicas from '../../Components/Modals/ModalGerenciarClinicas';
import ModalConfirmarCancelamento from '../../Components/Modals/ModalConfirmarCancelamento';
import ModalPerfil from '../../Components/Modals/ModalPerfil';
import ModalEditarConsulta from '../../Components/Modals/ModalEditarConsulta';
import ModalReagendarConsulta from '../../Components/Modals/ModalReagendarConsulta';

import '../../styles/Dashboard.css';

registerLocale('pt-BR', ptBR);

const Dashboard = () => {
  const navigate = useNavigate();

  // --- Hook de consultas ---
  const {
    consultas,
    adicionarConsulta,
    cancelarConsulta,
    salvarEdicao,
    salvarReagendamento,
    toggleLembrete,
  } = useConsultas();

  // --- Contexto de clínicas (corrigido: desestruturado aqui) ---
  const { clinicas, setClinicas } = useClinicas();

  // --- Estados de filtro ---
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [setorSelecionado, setSetorSelecionado] = useState('Todos os setores');

  // --- Estados de modais ---
  const [isModalNovoOpen, setIsModalNovoOpen] = useState(false);
  const [isModalClinicasOpen, setIsModalClinicasOpen] = useState(false);
  const [isModalPerfilOpen, setIsModalPerfilOpen] = useState(false);
  const [isModalEditarOpen, setIsModalEditarOpen] = useState(false);
  const [isModalReagendarOpen, setIsModalReagendarOpen] = useState(false);
  const [consultaParaCancelar, setConsultaParaCancelar] = useState(null);
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);

  // --- Filtro de consultas ---
  const consultasFiltradas = consultas.filter(consulta => {
    const dataFormatada = format(dataSelecionada, 'yyyy-MM-dd');
    const matchesData = consulta.data === dataFormatada;
    const matchesSetor = setorSelecionado === 'Todos os setores' || consulta.setor === setorSelecionado;
    return matchesData && matchesSetor;
  });

  // --- Handlers de modal ---
  const abrirEditarConsulta = (consulta) => {
    setConsultaSelecionada(consulta);
    setIsModalEditarOpen(true);
  };

  const abrirReagendarConsulta = (consulta) => {
    setConsultaSelecionada(consulta);
    setIsModalReagendarOpen(true);
  };

  const confirmarCancelamento = () => {
    if (consultaParaCancelar) {
      cancelarConsulta(consultaParaCancelar);
      setConsultaParaCancelar(null);
    }
  };

  return (
    <div className="dashboard-container">
      <HeaderDashboard
        totalConsultas={consultasFiltradas.length}
        dataSelecionada={dataSelecionada}
        onLogout={() => navigate('/')}
        onAbrirClinicas={() => setIsModalClinicasOpen(true)}
        onAbrirNovoAgendamento={() => setIsModalNovoOpen(true)}
      />

      <FiltroBar
        dataSelecionada={dataSelecionada}
        onDataChange={setDataSelecionada}
        setorSelecionado={setorSelecionado}
        onSetorChange={setSetorSelecionado}
      />

      <ConsultasTable
        consultas={consultasFiltradas}
        onToggleLembrete={toggleLembrete}
        onEditar={abrirEditarConsulta}
        onReagendar={abrirReagendarConsulta}
        onCancelar={setConsultaParaCancelar}
        onImprimir={() => {}}
      />

      {/* Modais */}
      {isModalNovoOpen && (
        <ModalNovoAgendamento
          onClose={() => setIsModalNovoOpen(false)}
          clinicas={clinicas}
          onSave={(nova) => { adicionarConsulta(nova); setIsModalNovoOpen(false); }}
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
        onLogout={() => navigate('/')}
      />
      {consultaParaCancelar && (
        <ModalConfirmarCancelamento
          consulta={consultaParaCancelar}
          onClose={() => setConsultaParaCancelar(null)}
          onConfirm={confirmarCancelamento}
        />
      )}
      {isModalEditarOpen && consultaSelecionada && (
        <ModalEditarConsulta
          onClose={() => { setIsModalEditarOpen(false); setConsultaSelecionada(null); }}
          onSave={(editada) => { salvarEdicao(consultaSelecionada, editada); setIsModalEditarOpen(false); setConsultaSelecionada(null); }}
          consulta={consultaSelecionada}
          clinicas={clinicas}
        />
      )}
      {isModalReagendarOpen && consultaSelecionada && (
        <ModalReagendarConsulta
          onClose={() => { setIsModalReagendarOpen(false); setConsultaSelecionada(null); }}
          onSave={(reagendada) => { salvarReagendamento(consultaSelecionada, reagendada); setIsModalReagendarOpen(false); setConsultaSelecionada(null); }}
          consulta={consultaSelecionada}
        />
      )}
    </div>
  );
};

export default Dashboard;