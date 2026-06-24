import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { differenceInMinutes } from 'date-fns';


export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// --- Cores de horário ---
export const getHorarioColor = (dataConsulta, horarioConsulta) => {
  const [ano, mes, dia] = dataConsulta.split('-');
  const [hora, minuto] = horarioConsulta.split(':');
  const dataHoraConsulta = new Date(
    parseInt(ano), parseInt(mes) - 1, parseInt(dia),
    parseInt(hora), parseInt(minuto)
  );
  const agora = new Date();
  const diferencaMinutos = differenceInMinutes(dataHoraConsulta, agora);

  if (diferencaMinutos < 0) return 'horario-atrasado';
  if (diferencaMinutos <= 60) return 'horario-proximo';
  return 'horario-normal';
};

// --- Cores de setor ---
export const getSetorColor = (setor) => {
  const cores = {
    "Geriatria":            { background: "#dcfce7", color: "#166534" },
    "Clínica Médica":       { background: "#dbeafe", color: "#1e40af" },
    "Enfermagem":           { background: "#fef3c7", color: "#92400e" },
    "Nutrição":             { background: "#fed7aa", color: "#9a3412" },
    "Psicologia":           { background: "#e0e7ff", color: "#3730a3" },
    "Serviço Social":       { background: "#fce7f3", color: "#9d174d" },
    "Fisioterapia":         { background: "#ccfbf1", color: "#115e59" },
    "Terapia Ocupacional":  { background: "#ede9fe", color: "#5b21b6" },
    "Fonoaudiologia":       { background: "#cffafe", color: "#155e75" },
    "Odonto":               { background: "#fef9c3", color: "#713f12" },
  };
  return cores[setor] || { background: "#f1f5f9", color: "#475569" };
};