// formatters.js — formatação de dados para exibição

export function formatarData(dataInput) {
  if (!dataInput || typeof dataInput !== 'string')
    throw new TypeError('Data inválida.');
  const parts = dataInput.split('/');
  if (parts.length !== 3)
    throw new TypeError('Formato esperado: DD/MM/YYYY.');
  const [dia, mes, ano] = parts;
  return `${dia}/${mes}/${ano}`;
}

export function normalizarNome(nome) {
  if (!nome || typeof nome !== 'string')
    throw new TypeError('Nome inválido.');
  return nome.trim().toLowerCase()
    .split(' ')
    .filter(p => p.length > 0)
    .map(p => p[0].toUpperCase() + p.slice(1))
    .join(' ');
}