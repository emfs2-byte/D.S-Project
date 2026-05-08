const mongoose = require('mongoose');

//Schema de agendamento
const AgendamentoSchema = new mongoose.Schema({
  // Nome do paciente
  nome_paciente: {
    type: String,
    required: true,
  },
  // Telefone do paciente
  telefone_paciente: {
    type: String,
    required: true,
  },
  // Nome do Responsável 
  responsavel: {
    type: String,
  },
  //Telefone do responsável
  telefone_responsavel: {
    type: String,
  },
  // Setor da clínica (ex: Odontologia, Cardiologia, etc)
  setor: {
    type: String,
    required: true,
  },
  // Data da consulta
  data: {
    type: Date,
    required: true,
  },
  // Horário da consulta 
  horario: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

// Exporta o model para ser usado em controllers e rotas
module.exports = mongoose.model('Agendamento', AgendamentoSchema);