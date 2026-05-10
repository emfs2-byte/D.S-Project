const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// SCHEMA: Define a estrutura do documento de usuário no MongoDB
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
}, { timestamps: true }); // Adiciona createdAt e updatedAt automaticamente

// PRÉ-PROCESSAMENTO: Criptografa a senha ANTES de salvar no banco
// Só executa se a senha foi modificada (protege contra re-criptografia)
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  // Gera um "salt" (número aleatório) para adicionar segurança à criptografia
  const salt = await bcrypt.genSalt(10);
  // Criptografa a senha com bcrypt
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// MÉTODO CUSTOMIZADO: Compara a senha fornecida com a senha criptografada no banco
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Exporta o modelo User para ser usado nos controllers e rotas
module.exports = mongoose.model('User', UserSchema); 