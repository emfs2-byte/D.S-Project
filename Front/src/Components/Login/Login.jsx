import React, { useState } from 'react';
import { FaUser, FaLock, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Calendar, Shield, MessageCircle, Monitor, Activity } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';

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
      const response = await api.post('/auth/login', { username, password });
      localStorage.setItem('@CliniDesk:token', response.data.token);
      navigate("/home"); 
    } catch (err) {
      setErro(err.response?.data?.error || "Erro ao conectar com o servidor");
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-white font-sans overflow-hidden">
      
      {/* LADO ESQUERDO: O GRADIENTE DO PRINT */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#054381] via-[#0073e6] to-[#01bfb5] flex-col justify-center p-20 relative">
        <div className="relative z-10 w-full max-w-md mx-auto">
          
          {/* LOGO LADO ESQUERDO */}
          <div className="flex items-center gap-4 mb-20">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl">
              <Monitor className="text-white" size={32} />
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-black text-white leading-none tracking-tight">CliniDesk</span>
              <span className="text-[11px] text-white/80 font-bold uppercase tracking-[0.2em] mt-1">Sua recepção, no controle</span>
            </div>
          </div>
          
          {/* FEATURES COM ÍCONES VAZADOS */}
          <div className="space-y-10">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-white border border-white/10">
                <Calendar size={22} />
              </div>
              <span className="text-lg font-medium text-white/90">Agendamentos em tempo real</span>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-white border border-white/10">
                <Shield size={22} />
              </div>
              <span className="text-lg font-medium text-white/90">Acesso seguro por setor</span>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-white border border-white/10">
                <MessageCircle size={22} />
              </div>
              <span className="text-lg font-medium text-white/90">...</span>
            </div>
          </div>
        </div>
      </div>

      {/* LADO DIREITO: FORMULÁRIO LIMPO */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-white">
        
        <form className="w-full max-w-[420px]" onSubmit={handleSubmit}>
          
          {/* EXIBIÇÃO DE ERRO */}
          {erro && <p className="text-red-500 text-sm font-bold mb-4">{erro}</p>}

          {/* O ÍCONE COM O SELO DE PULSO (IGUAL À FOTO) */}
          <div className="flex flex-col items-center mb-12 text-center">
            <div className="w-20 h-20 bg-white border border-slate-100 shadow-[0_15px_35px_rgba(0,0,0,0.05)] rounded-[24px] flex items-center justify-center relative mb-8">
                <Monitor className="text-[#0177fb]" size={42} />
                {/* O detalhe do pulso azul escuro */}
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#002d5c] rounded-full border-[4px] border-white flex items-center justify-center">
                   <Activity size={14} className="text-white" strokeWidth={3} />
                </div>
            </div>

            <h1 className="text-[34px] font-black text-[#001d3d] leading-tight">Bem-vindo ao CliniDesk</h1>
            <p className="text-slate-400 font-semibold text-base mt-1">Faça login para acessar o painel</p>
          </div>

          {/* CAMPOS DE INPUT */}
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2 block ml-1">Iniciais do Usuário</label>
              <div className="relative">
                <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                <input 
                  type="text" 
                  placeholder="erlon"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-slate-100 rounded-[18px] py-5 pl-14 pr-6 outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white focus:border-blue-200 transition-all text-slate-600 font-bold placeholder:text-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2 block ml-1">Senha</label>
              <div className="relative">
                <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                <input 
                  type={verSenha ? "text" : "password"} 
                  placeholder="•••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-slate-100 rounded-[18px] py-5 pl-14 pr-14 outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white focus:border-blue-200 transition-all text-slate-600 font-bold placeholder:text-slate-200"
                />
                <button 
                  type="button"
                  onClick={() => setVerSenha(!verSenha)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-blue-500 transition-colors"
                >
                  {verSenha ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* OPÇÕES */}
          <div className="flex justify-between items-center mt-8 mb-10">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setLembrar(!lembrar)}>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${lembrar ? 'border-[#00a8c5] bg-[#00a8c5]' : 'border-slate-100'}`}>
                {lembrar && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <span className="text-sm text-slate-400 font-bold">Lembrar de mim</span>
            </div>
            <a href="#" className="text-sm text-[#00a8c5] font-black hover:underline">Esqueci minha senha</a>
          </div>

          {/* BOTÃO ENTRAR COM GRADIENTE FIEL */}
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-[#0162dd] to-[#01b6d1] text-white font-black py-5 rounded-[22px] shadow-2xl shadow-blue-100 transition-all transform active:scale-[0.98] text-lg tracking-widest uppercase"
          >
            Entrar
          </button>

          {/* RODAPÉ DO FORM */}
          <div className="text-center mt-10">
            <span className="text-sm text-slate-300 font-bold">Não tem uma conta? </span>
            <a href="#" className="text-sm text-[#00a8c5] font-black hover:underline">Criar conta</a>
          </div>

          <div className="mt-16 text-center space-y-1 opacity-40">
            <p className="text-[9px] text-slate-400 uppercase tracking-[0.3em] font-black">CliniDesk v1.0.0 — Sistema de Gestão Clínica</p>
            <p className="text-[9px] text-slate-400 uppercase tracking-[0.1em] font-bold">Acesso restrito a profissionais autorizados</p>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;