// validators.js — validações puras para o sistema NPI

export function isValidNome(nome) {
  if (nome === null || nome === undefined) return false;
  if (typeof nome !== 'string') return false;
  const trimmed = nome.trim();
  if (trimmed.length < 3) return false;
  return /^[A-Za-zÀ-ÿ\s]+$/.test(trimmed);
}

export function isValidTelefone(telefone) {
  if (!telefone || typeof telefone !== 'string') return false;
  const digits = telefone.replace(/\D/g, '');
  return digits.length === 10 || digits.length === 11;
}

export function isValidDataConsulta(data) {
  if (!data || typeof data !== 'string') return false;
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(data)) return false;
  const [dia, mes, ano] = data.split('/');
  const dataConsulta = new Date(`${ano}-${mes}-${dia}`);
  if (isNaN(dataConsulta.getTime())) return false;
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  return dataConsulta >= hoje;
}

export function isValidHorario(horario) {
  if (!horario || typeof horario !== 'string') return false;
  if (!/^\d{2}:\d{2}$/.test(horario)) return false;
  const [hora, minuto] = horario.split(':').map(Number);
  if (minuto < 0 || minuto > 59) return false;
  if (hora < 8 || hora > 18) return false;
  if (hora === 18 && minuto > 0) return false;
  return true;
}