const mongoose = require('mongoose');

const AgendamentoSchema = new mongoose.Schema({
  nome_paciente: {
    type: String,
    required: true,
    trim: true,
    match: [/^[A-Za-zÀ-ÿ\s'-]+$/,]
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
  },
  dataRetorno: {
    type: Date,
    default: null
  },
  observacaoRetorno: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Agendamento', AgendamentoSchema);