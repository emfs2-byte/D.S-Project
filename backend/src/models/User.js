const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define a estrutura do documento de usuário no MongoDB
const UserSchema = new mongoose.Schema({
  // Nome completo do usuário
  name: { type: String, required: true },
  // Nome de usuário único para login (sem espaços em branco)
  username: {
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  },
  // Senha (será criptografada antes de salvar)
  password: { type: String, required: true },
}, { timestamps: true }); 

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  // Criptografa a senha com bcrypt
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compara a senha fornecida com a senha criptografada no banco
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Exporta o modelo User para ser usado nos controllers e rotas
module.exports = mongoose.model('User', UserSchema); 