import React, { useState } from 'react';
import { FaUser, FaLock, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Calendar, Shield, MessageCircle, Monitor, Activity } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';
import '../../styles/Login.css'; 

const Login = () => {
  const navigate = useNavigate();
  const [verSenha, setVerSenha] = useState(false);
  const [lembrar, setLembrar] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setErro('');

    try {
      await api.post('/auth/login', { username, password })
      navigate("/home"); 
    } catch (err) {
      setErro(err.response?.data?.error || "Erro ao conectar com o servidor");
    }
  };

  return (
    <div className="login-screen-container">
      
      {/* LADO ESQUERDO */}
      <div className="login-panel-left">
        <div className="left-panel-content">
          
          {/* LOGO LADO ESQUERDO */}
          <div className="left-logo-wrapper">
            <div className="left-logo-icon-box">
              <Monitor className="text-white" size={32} />
            </div>
            <div className="left-logo-text-box">
              <span className="left-logo-title">CliniDesk</span>
              <span className="left-logo-subtitle">Sua recepção, no controle</span>
            </div>
          </div>
          
          {/* FEATURES COM ÍCONES VAZADOS */}
          <div className="features-list">
            <div className="feature-item-row">
              <div className="feature-icon-box">
                <Calendar size={22} />
              </div>
              <span className="feature-text">Agendamentos em tempo real</span>
            </div>

            <div className="feature-item-row">
              <div className="feature-icon-box">
                <Shield size={22} />
              </div>
              <span className="feature-text">Acesso seguro por setor</span>
            </div>

            <div className="feature-item-row">
              <div className="feature-icon-box">
                <MessageCircle size={22} />
              </div>
              <span className="feature-text">Lembretes direcionados para pacientes</span>
            </div>
          </div>
        </div>
      </div>

      {/* LADO DIREITO */}
      <div className="login-panel-right">
        
        <form className="login-form-element" onSubmit={handleSubmit}>
          
          {/* EXIBIÇÃO DE ERRO */}
          {erro && <p className="error-message">{erro}</p>}

          {/* AVATAR E APRESENTAÇÃO */}
          <div className="form-header-wrapper">
            <div className="form-avatar-box">
                <Monitor className="text-[#0177fb]" size={42} />
                <div className="form-avatar-badge">
                   <Activity size={14} className="text-white" strokeWidth={3} />
                </div>
            </div>

            <h1 className="form-main-title">
              Bem-vindo ao Clini<span>Desk</span>
            </h1>
            <p className="form-subtitle">Faça login para acessar o painel</p>
          </div>

          {/* CAMPOS DE ENTRADA */}
          <div className="form-fields-stack">
            <div>
              <label className="input-field-label">Iniciais do Usuário</label>
              <div className="input-with-icon-wrapper">
                <FaUser className="input-left-icon" />
                <input 
                  type="text" 
                  placeholder="nome"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-custom-input"
                />
              </div>
            </div>

            <div>
              <label className="input-field-label">Senha</label>
              <div className="input-with-icon-wrapper">
                <FaLock className="input-left-icon" />
                <input 
                  type={verSenha ? "text" : "password"} 
                  placeholder="•••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-custom-input"
                />
                <button 
                  type="button"
                  onClick={() => setVerSenha(!verSenha)}
                  className="password-toggle-btn"
                >
                  {verSenha ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* OPÇÕES */}
          <div className="form-options-row">
            <div className="remember-me-toggle" onClick={() => setLembrar(!lembrar)}>
              <div className={`checkbox-custom-dot ${lembrar ? 'checked' : ''}`}>
                {lembrar && <div className="checkbox-inner-core" />}
              </div>
              <span className="remember-me-text">Lembrar de mim</span>
            </div>
          </div>

          {/* BOTÃO ENTRAR */}
          <button type="submit" className="submit-login-button">
            Entrar
          </button>

          {/* RODAPÉ */}
          <div className="footer-credits-box">
            <p className="footer-meta-text">CliniDesk v1.0.0 — Sistema de Gestão Clínica</p>
            <p className="footer-meta-text">Acesso restrito a profissionais autorizados</p>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;