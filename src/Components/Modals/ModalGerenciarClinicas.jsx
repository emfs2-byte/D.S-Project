import React, { useState } from 'react';
import { X, Plus, Lock, Trash2 } from 'lucide-react';
import './ModalGerenciarClinicas.css';

// 1. Recebemos clinicas e setClinicas como props do Dashboard
const ModalGerenciarClinicas = ({ onClose, clinicas, setClinicas }) => {
  const [novaClinica, setNovaClinica] = useState('');

  const adicionarClinica = () => {
    if (novaClinica.trim() !== "") {
      // 2. Atualiza o estado global lá no Dashboard
      setClinicas([...clinicas, { nome: novaClinica, fixa: false }]);
      setNovaClinica('');
    }
  };

  const removerClinica = (index) => {
    // 3. Remove da lista global usando o index
    const novaLista = clinicas.filter((_, i) => i !== index);
    setClinicas(novaLista);
  };

  return (
    <div className="modal-overlay">
      <div className="clinicas-modal-container">
        <div className="clinicas-header">
          <button 
            onClick={onClose} 
            className="btn-close" 
            style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
          >
            <X size={24} />
          </button>
          <h2 className="text-xl font-bold">Gerenciar Clínicas</h2>
          <p className="text-sm opacity-90">Adicione ou remova especialidades. Clínicas padrão não podem ser removidas.</p>
        </div>

        <div className="clinicas-content">
          <div className="search-add-group">
            <input 
              placeholder="Nova clínica..." 
              value={novaClinica}
              onChange={(e) => setNovaClinica(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && adicionarClinica()}
            />
            <button className="btn-add-clinica" onClick={adicionarClinica}>
              <Plus size={18} /> Adicionar
            </button>
          </div>

          <div className="clinicas-list">
            {clinicas.map((clinica, index) => (
              <div key={index} className="clinica-item">
                <span>{clinica.nome}</span>
                
                {clinica.fixa ? (
                  <Lock size={16} className="lock-icon" />
                ) : (
                  <Trash2 
                    size={16} 
                    className="trash-icon cursor-pointer hover:text-red-500" 
                    onClick={() => removerClinica(index)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'center', paddingBottom: '1rem', fontSize: '0.7rem', color: '#cbd5e1' }}>CliniDesk</div>
      </div>
    </div>
  );
};

export default ModalGerenciarClinicas;