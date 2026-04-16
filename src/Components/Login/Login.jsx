import React, { useState } from 'react';
import CliniDeskLogo from './CliniDeskLogo';
import { FaUser, FaLock, FaRegEye } from "react-icons/fa";
import { Calendar, Shield, MessageCircle } from "lucide-react";
import "../../styles/Login.css";

// AJUSTE: Caminhos relativos para evitar erro de tela branca
import { Button } from "../ui/button"; 
import { Input } from "../ui/input";

import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [lembrar, setLembrar] = useState(false);

  const handleRadioClick = () => {
    setLembrar(!lembrar);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    // Redireciona para a rota /home definida no App.jsx
    navigate("/home"); 
  };

  return (
    <div className="main">
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

      <div className="right">
        <form className="container container-custom" onSubmit={handleSubmit}>
          <div className="form-header">
            <div className="logo-form-header">
              <CliniDeskLogo />
            </div>
            <h1>Bem-vindo ao CliniDesk</h1>
            <p>Faça login para acessar o painel</p>
          </div>

          <div className="space-y-5">
            {/* INICIAIS */}
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Iniciais do Usuário</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input type="text" placeholder="ex: abcd" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-cyan-100 transition-all text-slate-600" />
              </div>
            </div>

            {/* SENHA */}
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Senha</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input type="password" placeholder="••••••" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-12 outline-none focus:ring-2 focus:ring-cyan-100 transition-all text-slate-600" />
                <FaRegEye className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 cursor-pointer hover:text-cyan-500" />
              </div>
            </div>
          </div>

          {/* CHECKBOX E ESQUECI SENHA */}
          <div className="flex justify-between items-center mt-6 mb-8">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setLembrar(!lembrar)}>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${lembrar ? 'border-cyan-500 bg-cyan-500' : 'border-slate-200'}`}>
                {lembrar && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <span className="text-sm text-slate-500 font-medium group-hover:text-slate-700">Lembrar de mim</span>
            </div>
            <a href="#" className="text-sm text-cyan-500 font-bold hover:underline">Esqueci minha senha</a>
          </div>

          {/* BOTÃO */}
          <button className="login-button">
            Entrar
          </button>

          {/* CRIAR CONTA */}
          <div className="text-center mt-8">
            <span className="text-sm text-slate-400">Não tem uma conta? </span>
            <a href="#" className="text-sm text-cyan-500 font-bold hover:underline">Criar conta</a>
          </div>

          {/* FOOTER */}
          <div className="mt-12 text-center text-[10px] text-slate-300 uppercase tracking-widest font-bold">
            <p>CliniDesk v1.0.0 — Sistema de Gestão Clínica</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;