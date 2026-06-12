import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import { format } from "date-fns";
import { useConsultas } from "./hooks/useConsultas";
import HeaderDashboard from "./components/HeaderDashboard";
import FiltroBar from "./components/FiltroBar";
import ConsultasTable from "./components/ConsultasTable";
import { useClinicas } from "../../contexts/ClinicasContext";
import ModalNovoAgendamento from "../../Components/Modals/ModalNovoAgendamento";
import ModalGerenciarClinicas from "../../Components/Modals/ModalGerenciarClinicas";
import ModalConfirmarCancelamento from "../../Components/Modals/ModalConfirmarCancelamento";
import ModalPerfil from "../../Components/Modals/ModalPerfil";
import ModalEditarConsulta from "../../Components/Modals/ModalEditarConsulta";
import ModalReagendarConsulta from "../../Components/Modals/ModalReagendarConsulta";
import ModalEscolherWhatsApp from "../../Components/Modals/ModalEscolherWhatsApp";
import ModalEnvioLote from "../../Components/Modals/ModalEnvioLote";
import { FaWhatsapp } from "react-icons/fa";

import "../../styles/Dashboard.css";

registerLocale("pt-BR", ptBR);

const Dashboard = () => {
  const navigate = useNavigate();

  const {
    consultas,
    adicionarConsulta,
    cancelarConsulta,
    salvarEdicao,
    salvarReagendamento,
    toggleLembrete,
  } = useConsultas();

  const { clinicas, setClinicas } = useClinicas();

  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [setorSelecionado, setSetorSelecionado] = useState("Todos os setores");
  const [selecionados, setSelecionados] = useState([]);

  // Estados de modais
  const [isModalNovoOpen, setIsModalNovoOpen] = useState(false);
  const [isModalClinicasOpen, setIsModalClinicasOpen] = useState(false);
  const [isModalPerfilOpen, setIsModalPerfilOpen] = useState(false);
  const [isModalEditarOpen, setIsModalEditarOpen] = useState(false);
  const [isModalReagendarOpen, setIsModalReagendarOpen] = useState(false);
  const [isModalWhatsOpen, setIsModalWhatsOpen] = useState(false);
  const [isModalLoteOpen, setIsModalLoteOpen] = useState(false);
  
  const [consultaParaCancelar, setConsultaParaCancelar] = useState(null);
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);
  const [consultaWhatsApp, setConsultaWhatsApp] = useState(null);

  const consultasFiltradas = consultas.filter((consulta) => {
    if (!consulta || !consulta.data) return false;
    const dataCalendarioFormatada = format(dataSelecionada, "yyyy-MM-dd");
    const dataConsultaLimpa = consulta.data.includes("T") ? consulta.data.split("T")[0] : consulta.data;
    const matchesData = dataConsultaLimpa === dataCalendarioFormatada;
    const matchesSetor = setorSelecionado === "Todos os setores" || consulta.setor === setorSelecionado;
    return matchesData && matchesSetor;
  });

  useEffect(() => {
    setSelecionados([]);
  }, [dataSelecionada, setorSelecionado]);

  const handleToggleSelecao = (consulta) => {
    setSelecionados((prev) =>
      prev.includes(consulta) ? prev.filter((c) => c !== consulta) : [...prev, consulta]
    );
  };

  const handleSelecionarTodos = () => {
    setSelecionados(selecionados.length === consultasFiltradas.length && consultasFiltradas.length > 0 ? [] : [...consultasFiltradas]);
  };

  return (
    <div className="dashboard-container">
      <HeaderDashboard
        totalConsultas={consultasFiltradas.length}
        dataSelecionada={dataSelecionada}
        onLogout={() => navigate("/")}
        onAbrirClinicas={() => setIsModalClinicasOpen(true)}
        onAbrirNovoAgendamento={() => setIsModalNovoOpen(true)}
      />

      <FiltroBar
        dataSelecionada={dataSelecionada}
        onDataChange={setDataSelecionada}
        setorSelecionado={setorSelecionado}
        onSetorChange={setSetorSelecionado}
      />

      {/* Painel Único de Ação em Lote */}
      {selecionados.length > 0 && (
        <div className="lote-panel">
          <span className="lote-text">
            {selecionados.length} paciente(s) selecionado(s)
          </span>
          <button className="lote-button" onClick={() => setIsModalLoteOpen(true)}>
            <FaWhatsapp size={18} /> Enviar Lembretes em Lote
          </button>
        </div>
      )}

      <ConsultasTable
        consultas={consultasFiltradas}
        onToggleLembrete={toggleLembrete}
        onEditar={(c) => { setConsultaSelecionada(c); setIsModalEditarOpen(true); }}
        onReagendar={(c) => { setConsultaSelecionada(c); setIsModalReagendarOpen(true); }}
        onCancelar={setConsultaParaCancelar}
        onWhatsApp={(c) => { setConsultaWhatsApp(c); setIsModalWhatsOpen(true); }}
        selecionados={selecionados}
        onToggleSelecao={handleToggleSelecao}
        onSelecionarTodos={handleSelecionarTodos}
      />

      {/* Modais */}
      {isModalLoteOpen && <ModalEnvioLote selecionados={selecionados} onClose={() => setIsModalLoteOpen(false)} />}
      
      {isModalNovoOpen && <ModalNovoAgendamento onClose={() => setIsModalNovoOpen(false)} clinicas={clinicas} onSave={(nova) => { adicionarConsulta(nova); setIsModalNovoOpen(false); }} />}
      {isModalClinicasOpen && <ModalGerenciarClinicas onClose={() => setIsModalClinicasOpen(false)} clinicas={clinicas} setClinicas={setClinicas} />}
      <ModalPerfil isOpen={isModalPerfilOpen} onClose={() => setIsModalPerfilOpen(false)} onLogout={() => navigate("/")} />
      {consultaParaCancelar && <ModalConfirmarCancelamento consulta={consultaParaCancelar} onClose={() => setConsultaParaCancelar(null)} onConfirm={confirmarCancelamento} />}
      {isModalEditarOpen && consultaSelecionada && <ModalEditarConsulta onClose={() => { setIsModalEditarOpen(false); setConsultaSelecionada(null); }} onSave={(editada) => { salvarEdicao(consultaSelecionada, editada); setIsModalEditarOpen(false); setConsultaSelecionada(null); }} consulta={consultaSelecionada} clinicas={clinicas} />}
      {isModalReagendarOpen && consultaSelecionada && <ModalReagendarConsulta onClose={() => { setIsModalReagendarOpen(false); setConsultaSelecionada(null); }} onSave={(reagendada) => { salvarReagendamento(consultaSelecionada, reagendada); setIsModalReagendarOpen(false); setConsultaSelecionada(null); }} consulta={consultaSelecionada} />}
      {isModalWhatsOpen && consultaWhatsApp && <ModalEscolherWhatsApp consulta={consultaWhatsApp} onClose={() => { setIsModalWhatsOpen(false); setConsultaWhatsApp(null); }} onConfirm={() => { setIsModalWhatsOpen(false); setConsultaWhatsApp(null); }} />}
    </div>
  );
};

export default Dashboard;