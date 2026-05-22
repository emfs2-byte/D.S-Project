import React from 'react';

// Função utilitária de formatação de data (PASSO 1)
const formatarDataBR = (dataISO) => {
  if (!dataISO) return '';
  const data = new Date(dataISO);
  return data.toLocaleDateString('pt-BR');
};

const formatarHora = (dataISO) => {
  if (!dataISO) return '';
  const data = new Date(dataISO);
  return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};

const ListaHistoricoTimeline = ({ registros, filtroSetor, onFiltroChange }) => {
  // Aplicar filtro de setor (FEATURE)
  const registrosFiltrados = filtroSetor === 'Todos'
    ? registros
    : registros.filter(reg => reg.setor === filtroSetor);

  // Agrupar registros por data
  const registrosPorData = registrosFiltrados.reduce((acc, registro) => {
    const dataKey = registro.data;
    if (!acc[dataKey]) {
      acc[dataKey] = [];
    }
    acc[dataKey].push(registro);
    return acc;
  }, {});

  // Ordenar datas decrescentes
  const datasOrdenadas = Object.keys(registrosPorData).sort().reverse();

  // Cores por setor (PASSO 3 - evitando magic strings)
  const getCorSetor = (setor) => {
    const cores = {
      "Fisioterapia": { bg: "#ccfbf1", color: "#115e59", border: "#14b8a6" },
      "Psicologia": { bg: "#e0e7ff", color: "#3730a3", border: "#6366f1" },
      "Enfermagem": { bg: "#fef3c7", color: "#92400e", border: "#f59e0b" },
      "Medicina": { bg: "#dbeafe", color: "#1e40af", border: "#3b82f6" },
      "Nutrição": { bg: "#fed7aa", color: "#9a3412", border: "#f97316" }
    };
    return cores[setor] || { bg: "#f1f5f9", color: "#475569", border: "#94a3b8" };
  };

  return (
    <div className="lista-historico-timeline">
      {/* FEATURE: Botões de Filtro por Setor */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1.5rem',
        padding: '1rem',
        background: '#f8fafc',
        borderRadius: '8px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => onFiltroChange('Todos')}
          style={{
            padding: '0.5rem 1rem',
            background: filtroSetor === 'Todos' ? '#3b82f6' : '#e2e8f0',
            color: filtroSetor === 'Todos' ? 'white' : '#475569',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          Todos os Setores
        </button>
        {["Fisioterapia", "Psicologia", "Enfermagem", "Medicina", "Nutrição"].map(setor => {
          const cores = getCorSetor(setor);
          return (
            <button
              key={setor}
              onClick={() => onFiltroChange(setor)}
              style={{
                padding: '0.5rem 1rem',
                background: filtroSetor === setor ? cores.bg : '#e2e8f0',
                color: filtroSetor === setor ? cores.color : '#475569',
                border: filtroSetor === setor ? `2px solid ${cores.border}` : 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              {setor}
            </button>
          );
        })}
      </div>

      {/* Timeline de Registros */}
      {registrosFiltrados.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: '#94a3b8',
          background: '#f8fafc',
          borderRadius: '8px'
        }}>
          Nenhum registro encontrado para este filtro
        </div>
      ) : (
        <div style={{ position: 'relative', paddingLeft: '2rem' }}>
          {/* Linha do tempo vertical */}
          <div style={{
            position: 'absolute',
            left: '0.5rem',
            top: '0',
            bottom: '0',
            width: '2px',
            background: '#cbd5e1'
          }}></div>

          {datasOrdenadas.map(data => (
            <div key={data} style={{ marginBottom: '2rem', position: 'relative' }}>
              {/* Marcador de data */}
              <div style={{
                position: 'absolute',
                left: '-2rem',
                top: '0',
                width: '12px',
                height: '12px',
                background: '#3b82f6',
                borderRadius: '50%',
                border: '3px solid white',
                boxShadow: '0 0 0 2px #3b82f6'
              }}></div>
              
              <div style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '1rem',
                background: '#f1f5f9',
                display: 'inline-block',
                padding: '0.25rem 0.75rem',
                borderRadius: '12px'
              }}>
                {formatarDataBR(data)}
              </div>

              {registrosPorData[data].map(registro => {
                const cores = getCorSetor(registro.setor);
                return (
                  <div
                    key={registro.id}
                    style={{
                      background: 'white',
                      border: `1px solid ${cores.border}`,
                      borderRadius: '8px',
                      padding: '1rem',
                      marginBottom: '1rem',
                      marginLeft: '1rem',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.75rem',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}>
                      <span style={{
                        background: cores.bg,
                        color: cores.color,
                        padding: '0.25rem 0.75rem',
                        borderRadius: '4px',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}>
                        {registro.setor}
                      </span>
                      <span style={{
                        fontSize: '0.75rem',
                        color: '#64748b'
                      }}>
                        {formatarHora(registro.timestamp)} • {registro.profissional}
                      </span>
                    </div>
                    <p style={{
                      margin: 0,
                      color: '#334155',
                      lineHeight: '1.5'
                    }}>
                      {registro.texto}
                    </p>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaHistoricoTimeline;