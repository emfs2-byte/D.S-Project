import React, { useState } from 'react';
import CliniDeskLogo from './CliniDeskLogo';
import { FaUser, FaLock, FaRegEye } from "react-icons/fa";
import { Calendar, Shield, MessageCircle } from "lucide-react";
import "../../styles/Login.css";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

const Login = () => {
  // Lógica para permitir que o radio seja desmarcado
  const [lembrar, setLembrar] = useState(false);

  const handleRadioClick = () => {
    setLembrar(!lembrar);
  };

  return (
    <div className="main">
      {/* LADO AZUL */}
      <div className="left">
        <CliniDeskLogo />
        <div className="features">
          <div className="feature-item">
            <div><Calendar /></div>
            <span>Agendamentos em tempo real</span>
          </div>
          <div className="feature-item">
            <div><Shield /></div>
            <span>Acesso seguro por setor</span>
          </div>
          <div className="feature-item">
            <div><MessageCircle /></div>
            <span>Integração com WhatsApp</span>
          </div>
        </div>
      </div>

      {/* LADO BRANCO */}
      <div className="right">
        <form className="container container-custom" onSubmit={(e) => e.preventDefault()}>
          <div className="form-header">
            <div className="logo-form-header">
              <CliniDeskLogo />
            </div>
            
            <h1>Bem-vindo ao CliniDesk</h1>
            <p>Faça login para acessar o painel</p>
          </div>

          <div className="input-group-custom">
            <label className="field-label-tiny">INICIAIS DO USUÁRIO</label>
            <div className="input-box-custom">
              <FaUser className="left-icon-custom" />
              <Input type="text" placeholder="Ex: abcd" required />
            </div>
          </div>

          <div className="input-group-custom">
            <label className="field-label-tiny">SENHA</label>
            <div className="input-box-custom">
              <FaLock className="left-icon-custom" />
              <Input type="password" placeholder="******" required />
              <FaRegEye className="eye-custom" />
            </div>
          </div>

          <div className="recall-forget">
            <div className="remember-me" onClick={handleRadioClick}>
              <input 
                type="radio" 
                id="remember" 
                name="remember" 
                className="radio-custom"
                checked={lembrar}
                readOnly
              />
              <label htmlFor="remember" onClick={(e) => e.preventDefault()}>
                Lembrar de mim
              </label>
            </div>
            <a href="#" className="forgot-password">Esqueci minha senha</a>
          </div>

          <Button type="submit" className="btn-entrar btn-custom">Entrar</Button>

          <div className="signup-link">
            <p>Não tem uma conta? <a href="#">Criar conta</a></p>
          </div>

          <div className="footer-credits-custom">
            <p>CliniDesk v1.0.0 — Sistema de Gestão Clínica</p>
            <p>Acesso restrito a profissionais autorizados</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;