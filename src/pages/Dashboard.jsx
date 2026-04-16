import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans p-6 text-slate-800">
      
      {/* HEADER */}
      <header className="flex items-center justify-between pb-6 mb-8 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <div className="text-xl text-slate-500 font-bold">&#9776;</div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-slate-300 flex items-center justify-center font-bold text-lg text-slate-600 bg-white">
              <span className="text-slate-700">C</span>
            </div>
            <div className="flex flex-col">
              <h1 className="font-extrabold text-2xl tracking-tighter text-slate-950">
                CliniDesk
              </h1>
              <span className="text-xs text-slate-500 font-medium mt-1">
                Sua recepção, no controle
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-slate-200 text-slate-700">
            ER
          </div>
          <div className="text-xl text-slate-500 font-bold">&#9881;</div>
          <div className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-medium cursor-default">
            <span>&#8618;</span> 
            <span>Sair</span>
          </div>
        </div>
      </header>

      {/* TÍTULO E BOTÕES */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-slate-900">
              Consultas do Dia — CliniDesk
            </h2>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xl font-bold bg-sky-100 text-sky-700">
              0
            </div>
          </div>
          <p className="text-slate-500 mt-2 font-medium">
            quinta-feira, 16 de abril de 2026
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-200 shadow-sm rounded-full text-slate-700 font-semibold cursor-default">
            <span>&#9881;</span> <span>Clínicas</span>
          </div>
          <div className="flex items-center gap-2 px-6 py-2 bg-sky-500 text-white shadow-md rounded-full font-semibold cursor-default">
            <span>+</span> <span>Novo</span>
          </div>
        </div>
      </div>

      {/* BARRA DE FILTROS */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-3 mb-12 flex gap-4">
        <div className="flex-1 flex items-center gap-3 bg-slate-100 px-4 py-3 rounded-2xl border border-gray-200 text-slate-400 cursor-default">
          <span className="text-lg">&#128269;</span> 
          <span className="text-sm font-medium">Buscar por paciente ou telefone...</span>
        </div>

        <div className="flex items-center gap-3 bg-slate-100 px-4 py-3 rounded-2xl border border-gray-200 text-slate-600 w-56 cursor-default">
          <span className="text-lg text-sky-500">&#128197;</span> 
          <span className="text-sm font-medium">16/04/2026</span>
        </div>

        <div className="flex items-center justify-between bg-slate-100 px-4 py-3 rounded-2xl border border-gray-200 text-slate-600 w-64 cursor-default">
          <span className="text-sm font-medium">Todos os setores</span>
          <span className="text-xs text-slate-400 font-extrabold">&#9662;</span> 
        </div>
      </div>

      {/* TABELA VAZIA */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-slate-950 text-white text-xs font-bold uppercase tracking-wider grid grid-cols-7 py-5 px-6">
          <div className="col-span-1">PACIENTE</div>
          <div className="col-span-1">RESPONSÁVEL</div>
          <div className="col-span-1">CONTATOS</div>
          <div className="col-span-1">SETOR</div>
          <div className="col-span-1">HORÁRIO</div>
          <div className="col-span-1">STATUS</div>
          <div className="col-span-1 text-right">AÇÕES</div>
        </div>

        <div className="py-24 flex justify-center items-center">
          <p className="text-slate-400 text-sm font-medium">
            Nenhuma consulta encontrada para os filtros selecionados.
          </p>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;