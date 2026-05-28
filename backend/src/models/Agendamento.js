const mongoose = require('mongoose');

const AgendamentoSchema = new mongoose.Schema({
  nome_paciente: {
    type: String,
    required: true,
  },
  telefone_paciente: {
    type: String,
    required: true,
  },
  responsavel: {
    type: String,
    required: true,
  },
  telefone_responsavel: {
    type: String,
    required: true,
  },
  setor: {
    type: String,
    required: true,
  },
  data: {
    type: Date,
    required: true,
  },
  horario: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Agendamento', AgendamentoSchema);