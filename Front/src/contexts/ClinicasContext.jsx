import { createContext, useContext, useState } from 'react';

// 1. Cria o contexto (o "mural")
const ClinicasContext = createContext();

// 2. Cria o Provider (quem coloca as informações no mural)
export const ClinicasProvider = ({ children }) => {
  const [clinicas, setClinicas] = useState([
    { nome: "Geriatria",           fixa: true },
    { nome: "Clínica Médica",      fixa: true },
    { nome: "Enfermagem",          fixa: true },
    { nome: "Nutrição",            fixa: true },
    { nome: "Psicologia",          fixa: true },
    { nome: "Serviço Social",      fixa: true },
    { nome: "Fisioterapia",        fixa: true },
    { nome: "Terapia Ocupacional", fixa: true },
    { nome: "Fonoaudiologia",      fixa: true },
  ]);

  return (
    <ClinicasContext.Provider value={{ clinicas, setClinicas }}>
      {children}
    </ClinicasContext.Provider>
  );
};

// 3. Cria o hook para facilitar o uso (atalho para acessar o mural)
export const useClinicas = () => {
  const context = useContext(ClinicasContext);

  if (!context) {
    throw new Error('useClinicas deve ser usado dentro de ClinicasProvider');
  }

  return context;
};