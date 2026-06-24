import { LogOut, Settings, Plus } from 'lucide-react';
import CliniDeskLogo from '../../../components/login/CliniDeskLogo';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const HeaderDashboard = ({
  totalConsultas,
  dataSelecionada,
  onLogout,
  onAbrirClinicas,
  onAbrirNovoAgendamento,
}) => {
  return (
    <>
      {/* Cabeçalho com logo e botão sair */}
      <header className="dashboard-header">
        <div className="brand-group">
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
          <div className="logout-button" onClick={onLogout} style={{ cursor: 'pointer' }}>
            <LogOut size={18} /><span>Sair</span>
          </div>
        </div>
      </header>

      {/* Título, data e botões de ação */}
      <div className="main-actions-row">
        <div className="title-section">
          <div className="title-with-badge">
            <h1 className="brand-title">Consultas do Dia — CliniDesk</h1>
            <div className="count-badge">{totalConsultas}</div>
          </div>
          <h2 className="brand-subtitle">
            {format(dataSelecionada, "eeee, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </h2>
        </div>
        <div className="action-buttons">
          <button onClick={onAbrirClinicas} className="btn-clinicas">
            <Settings size={18} /> <span>Clínicas</span>
          </button>
          <button onClick={onAbrirNovoAgendamento} className="btn-novo">
            <Plus size={20} /> <span>Novo</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default HeaderDashboard;