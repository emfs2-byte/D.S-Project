const mongoose = require('mongoose');

const AgendamentoSchema = new mongoose.Schema({
  nome_paciente: {
    type: String,
    required: true,
    trim: true,
    match: [/^[A-Za-zÀ-ÿ\s'-]+$/, 'Nome deve conter apenas letras, espaços, apóstrofos ou hífens.']
  },
  telefone_paciente: {
    type: String,
    required: true,
  },
  responsavel: {
    type: String,
    required: true,
    trim: true,
    match: [/^[A-Za-zÀ-ÿ\s'-]+$/, 'Nome do responsável deve conter apenas letras, espaços, apóstrofos ou hífens.']
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
    match: [/^[A-Za-zÀ-ÿ\s'-]+$/, 'Nome do médico deve conter apenas letras, espaços, apóstrofos ou hífens.']
  },
  observacaoRetorno: {
    type: String,
    default: null,
    match: [/^[A-Za-zÀ-ÿ\s'-]+$/, 'Observação contém caracteres inválidos.'],
    trim: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Agendamento', AgendamentoSchema);