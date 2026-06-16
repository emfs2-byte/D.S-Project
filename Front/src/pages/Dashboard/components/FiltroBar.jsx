import { useRef, useEffect, useState } from 'react';
import { Search, Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const FiltroBar = ({
  dataSelecionada,
  onDataChange,
  setorSelecionado,
  onSetorChange,
  clinicas,
  onBuscarChange
}) => {
  const [isSelectSetorOpen, setIsSelectSetorOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSelectSetorOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="filter-bar">
      {/* Campo de busca */}
      <div className="search-input-group">
        <Search size={20} />
        <input type="text" placeholder="Buscar por paciente ou telefone..."
          onChange={(e) => onBuscarChange(e.target.value)}
        />
      </div>

      {/* Seletor de data */}
      <div className="search-input-group date-picker-container" style={{ width: '200px' }}>
        <CalendarIcon size={20} />
        <DatePicker
          selected={dataSelecionada}
          onChange={onDataChange}
          locale="pt-BR"
          dateFormat="dd/MM/yyyy"
          className="datepicker-input"
        />
      </div>

      {/* Seletor de setor */}
      <div className="relative" ref={dropdownRef} style={{ width: '200px' }}>
        <div
          className="search-input-group cursor-pointer trigger-setor"
          onClick={() => setIsSelectSetorOpen(!isSelectSetorOpen)}
        >
          <span>{setorSelecionado}</span>
          <ChevronDown size={14} />
        </div>

        {isSelectSetorOpen && (
          <div className="dropdown-menu-setor">
            <div onClick={() => { onSetorChange('Todos os setores'); setIsSelectSetorOpen(false); }}>
              Todos os setores
            </div>
            {clinicas?.map((clinica, idx) => (  
              <div
                key={idx}
                onClick={() => { onSetorChange(clinica.nome); setIsSelectSetorOpen(false); }}
              >
                {clinica.nome}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FiltroBar;