import { describe, it, expect } from "vitest";

import { buscarPacientePorNome }
from "../services/buscaPaciente.js";

import { mockPacientes }
from "../models/mockPacientes.js";

describe("Busca de paciente", () => {

  it("deve encontrar João", () => {

    const resultado = buscarPacientePorNome(
      "João",
      mockPacientes
    );

    expect(resultado).toEqual({
      nome: "João",
      tel: "1111"
    });

  });

});