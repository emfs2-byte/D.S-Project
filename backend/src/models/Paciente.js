const mongoose = require('mongoose');

const PacienteSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
  },
  telefone: {
    type: String,
    required: true,
  },
  dataNascimento: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Agendado', 'Atendido', 'Cancelado'],
    default: 'Agendado',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Paciente', PacienteSchema);