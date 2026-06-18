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
    trim: true,
    match: [/^[A-Za-zÀ-ÿ\s'-]+$/,]
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
  horarioRetorno: {
    type: String,
    default: null
  },
  setorRetorno: {
    type: String,
    default: null
  },
  medicoRetorno: {
    type: String,
    default: null,
    trim: true,
    match: [/^[A-Za-zÀ-ÿ\s'-]+$/,]
  },
  observacaoRetorno: {
    type: String,
    default: null,
    match: [/^[A-Za-zÀ-ÿ\s'-]+$/,],
    trim: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Agendamento', AgendamentoSchema);