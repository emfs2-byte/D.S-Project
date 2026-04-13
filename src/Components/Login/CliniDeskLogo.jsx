import { MonitorCheck } from "lucide-react";

export default function CliniDeskLogo({ isFormHeader }) {
  return (
    <div className={isFormHeader ? "logo-header-centered" : "clinidesk-logo-container"}>
      <div className="monitor-box">
        <MonitorCheck className="monitor-icon" strokeWidth={2} />
      </div>

      {/* Só exibe o texto completo se NÃO for o cabeçalho do formulário */}
      {!isFormHeader && (
        <div className="logo-text-wrapper">
          <h1 className="logo-title">
            Clini<span className="logo-span">Desk</span>
          </h1>
          <p className="logo-tagline">Sua recepção, no controle</p>
        </div>
      )}
    </div>
  );
}