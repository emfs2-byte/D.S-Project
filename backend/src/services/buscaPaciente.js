export function buscarPacientePorNome(nome, pacientes) {

  for (const id in pacientes) {

    const paciente = pacientes[id];

    if (paciente.nome === nome) {
      return paciente;
    }
  }
  return null;
}