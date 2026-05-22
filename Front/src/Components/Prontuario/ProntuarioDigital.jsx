import React, { useState } from 'react';
import FormNovoRegistro from './FormNovoRegistro';
import ListaHistoricoTimeline from './ListaHistoricoTimeline';

// Componente principal do Prontuário (agora pequeno e organizado)
const ProntuarioDigital = ({ pacienteId, pacienteNome, setorAtual }) => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [filtroSetor, setFiltroSetor] = useState('Todos');
  
  // Estado para armazenar registros (normalmente viria de uma API)
  const [registros, setRegistros] = useState([
    {
      id: 1,
      texto: "Paciente apresentou melhora significativa na amplitude de movimento do joelho direito. Continua com exercícios de fortalecimento.",
      setor: "Fisioterapia",
      data: "2026-05-20",
      timestamp: "2026-05-20T10:30:00",
      profissional: "Dr. Carlos Mendes"
    },
    {
      id: 2,
      texto: "Paciente relata ansiedade em relação ao processo cirúrgico. Realizada escuta ativa e orientações sobre técnicas de respiração.",
      setor: "Psicologia",
      data: "2026-05-20",
      timestamp: "2026-05-20T14:15:00",
      profissional: "Dra. Ana Paula"
    },
    {
      id: 3,
      texto: "Pressão arterial controlada com medicação atual. Orientações sobre dieta hipossódica mantidas.",
      setor: "Medicina",
      data: "2026-05-19",
      timestamp: "2026-05-19T09:00:00",
      profissional: "Dr. Roberto Alves"
    }
  ]);

  const handleSalvarRegistro = (novoRegistro) => {
    setRegistros([novoRegistro, ...registros]);
    setMostrarFormulario(false);
  };

  return (
    <div className="prontuario-digital" style={{ padding: '1.5rem' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h2 style={{ margin: 0, color: '#1e293b' }}>Prontuário Digital</h2>
          <p style={{ margin: '0.25rem 0 0', color: '#64748b' }}>
            Paciente: <strong>{pacienteNome}</strong>
          </p>
        </div>
        
        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          style={{
            padding: '0.5rem 1rem',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          {mostrarFormulario ? '✕ Cancelar' : '+ Novo Registro'}
        </button>
      </div>

      {mostrarFormulario && (
        <FormNovoRegistro
          onSave={handleSalvarRegistro}
          onCancel={() => setMostrarFormulario(false)}
          setorPadrao={setorAtual}
        />
      )}

      <ListaHistoricoTimeline
        registros={registros}
        filtroSetor={filtroSetor}
        onFiltroChange={setFiltroSetor}
      />
    </div>
  );
};

export default ProntuarioDigital;