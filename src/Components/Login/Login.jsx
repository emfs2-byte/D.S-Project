import React, { useState } from 'react';
import CliniDeskLogo from './CliniDeskLogo';
import { FaUser, FaLock, FaRegEye } from "react-icons/fa";
import { Calendar, Shield, MessageCircle } from "lucide-react";
import "../../styles/Login.css";

const Login = () => {
  const [lembrar, setLembrar] = useState(false);

  return (
    <div className="login-container font-sans">
      {/* LADO AZUL - ESQUERDA */}
      <div className="login-left hidden lg:flex">
        <div className="flex flex-col items-center">
          <CliniDeskLogo />
          <div className="mt-10 space-y-6">
            <div className="flex items-center gap-4 text-white/90">
              <div className="bg-white/10 p-2 rounded-lg"><Calendar size={20} /></div>
              <span className="font-medium">Agendamentos em tempo real</span>
            </div>
            <div className="flex items-center gap-4 text-white/90">
              <div className="bg-white/10 p-2 rounded-lg"><Shield size={20} /></div>
              <span className="font-medium">Acesso seguro por setor</span>
            </div>
            <div className="flex items-center gap-4 text-white/90">
              <div className="bg-white/10 p-2 rounded-lg"><MessageCircle size={20} /></div>
              <span className="font-medium">Integração com WhatsApp</span>
            </div>
          </div>
        </div>
      </div>

      {/* LADO BRANCO - DIREITA */}
      <div className="login-right">
        <form className="w-full max-w-[400px] flex flex-col" onSubmit={(e) => e.preventDefault()}>
          
          <div className="flex flex-col items-center">
            <CliniDeskLogo isFormHeader={true} />
            <h1 className="text-[25px] font-bold text-[#001a3d] mt-4 tracking-tight">Bem-vindo ao CliniDesk</h1>
            <p className="text-slate-400 text-[15px] mt-1 mb-8">Faça login para acessar o painel</p>
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
            <p className="flex items-center justify-center gap-1 mt-1"><Shield size={10} /> Acesso restrito a profissionais autorizados</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;