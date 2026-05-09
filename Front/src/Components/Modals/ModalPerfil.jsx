import React, { useState } from 'react';
import { X, Eye, EyeOff, LogOut } from 'lucide-react';

const ModalPerfil = ({ isOpen, onClose, onLogout }) => {
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content profile-modal">
        <header className="modal-header-gradient">
          <div className="header-text">
            <h2>Perfil</h2>
            <p>Informações do usuário logado.</p>
          </div>
          <button className="close-btn-white" onClick={onClose}>
            <X size={20} />
          </button>
        </header>

        <div className="profile-body">
          <div className="profile-avatar-center">
            <span>JW</span>
          </div>

          <div className="profile-field">
            <label>Iniciais</label>
            <input type="text" value="JWSBFGD" readOnly className="profile-input-gray" />
          </div>

          <div className="profile-field">
            <label>Senha</label>
            <div className="password-input-container">
              <input 
                type={showPassword ? "text" : "password"} 
                value="123456" 
                readOnly 
                className="profile-input-gray"
              />
              <button 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button className="profile-logout-btn" onClick={onLogout}>
            <LogOut size={18} /> Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPerfil;