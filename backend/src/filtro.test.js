import { describe, it, expect } from 'vitest';

// Função para passar o teste
function filtrarConsultasPorEspecialidade(consultas, especialidade) {
  return consultas.filter(c => c.especialidade === especialidade);
}

//Bloco de testes
describe("Filtro de Consulta por Setor e Especialidade", () => {
    //Teste principal
  it("deve retornar apenas consultas de Cardiologia", () => {
    // Dados Mockados
    const consultasMock = [
      { id: 1, paciente: "João", especialidade: "Cardiologia" },
      { id: 2, paciente: "Maria", especialidade: "Dermatologia" },
      { id: 3, paciente: "Ana", especialidade: "Cardiologia" },
    ];

    const resultado = filtrarConsultasPorEspecialidade(consultasMock, "Cardiologia");

    //Verifcica se o resultado contém apenas as consultas de cardiologia 
    expect(resultado).toEqual([
      { id: 1, paciente: "João", especialidade: "Cardiologia" },
      { id: 3, paciente: "Ana", especialidade: "Cardiologia" },
    ]);
  });
});
