import React, { useState } from 'react';

// Constantes dos setores (reutilizando do Passo 3)
const SETORES = {
  FISIOTERAPIA: "Fisioterapia",
  PSICOLOGIA: "Psicologia",
  ENFERMAGEM: "Enfermagem",
  MEDICINA: "Medicina",
  NUTRICAO: "Nutrição"
};

const FormNovoRegistro = ({ onSave, onCancel, setorPadrao = '' }) => {
  const [formData, setFormData] = useState({
    texto: '',
    setor: setorPadrao,
    data: new Date().toISOString().split('T')[0],
    profissional: ''
  });

  const handleSubmit = (e) => { 
    e.preventDefault();

    // PASSO 2: Early Returns (validações)
    if (!formData.texto.trim()) {
      alert("O texto da evolução é obrigatório.");
      return;
    }
    if (!formData.setor) {
      alert("Por favor, selecione um setor.");
      return;
    }
    if (!formData.profissional.trim()) {
      alert("O nome do profissional é obrigatório.");
      return;
    }

    // Salvar o registro com timestamp
    onSave({
      ...formData,
      id: Date.now(),
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="form-novo-registro" style={{
      background: 'white',
      padding: '1.5rem',
      borderRadius: '8px',
      marginBottom: '1.5rem',
      border: '1px solid #e2e8f0'
    }}>
      <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Novo Registro de Evolução</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Setor *</label>
          <select
            value={formData.setor}
            onChange={(e) => setFormData({...formData, setor: e.target.value})}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #cbd5e1',
              borderRadius: '4px'
            }}
          >
            <option value="">Selecione um setor</option>
            {Object.values(SETORES).map(setor => (
              <option key={setor} value={setor}>{setor}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Profissional *</label>
          <input
            type="text"
            placeholder="Nome do profissional"
            value={formData.profissional}
            onChange={(e) => setFormData({...formData, profissional: e.target.value})}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #cbd5e1',
              borderRadius: '4px'
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Evolução Clínica *</label>
          <textarea
            rows="4"
            placeholder="Descreva a evolução do paciente..."
            value={formData.texto}
            onChange={(e) => setFormData({...formData, texto: e.target.value})}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #cbd5e1',
              borderRadius: '4px',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '0.5rem 1rem',
              background: '#e2e8f0',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            style={{
              padding: '0.5rem 1rem',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Salvar Registro
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormNovoRegistro;