import { MonitorCheck } from "lucide-react";

export default function CliniDeskLogo() {
  return (
    <div className="clinidesk-logo-container">
      {/* Caixa do Monitor (Maior que as features) */}
      <div className="monitor-box">
        <MonitorCheck className="monitor-icon" strokeWidth={2} />
      </div>

      {/* Bloco de Texto */}
      <div className="logo-text-wrapper">
        <h1 className="logo-title">
          Clini<span className="logo-span">Desk</span>
        </h1>
        <p className="logo-tagline">Sua recepção, no controle</p>
      </div>
    </div>
  );
}