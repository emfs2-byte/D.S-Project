// calculators.js — regras de negócio puras do sistema NPI

export function diasParaConsulta(dataConsulta) {
  if (!dataConsulta || typeof dataConsulta !== 'string')
    throw new TypeError('Data inválida.');
  const consulta = new Date(dataConsulta);
  if (isNaN(consulta.getTime()))
    throw new TypeError('Data não reconhecida.');
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  consulta.setHours(0, 0, 0, 0);
  return Math.round((consulta - hoje) / (1000 * 60 * 60 * 24));
}

export function isHorarioDisponivel(horario, agendamentosDoDia) {
  if (!horario || typeof horario !== 'string')
    throw new TypeError('Horário inválido.');
  if (!Array.isArray(agendamentosDoDia))
    throw new TypeError('Lista deve ser um array.');
  return !agendamentosDoDia.some(a => a.horario === horario);
}