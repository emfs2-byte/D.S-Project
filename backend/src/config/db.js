const mongoose = require("mongoose");

// FUNÇÃO: Conecta a aplicação ao banco de dados MongoDB
const connectDB = async () => {
  try {
    // Tenta conectar ao MongoDB usando a URI do arquivo .env
    // MONGO_URI deve estar no formato: mongodb://user:password@host/database
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB conectado com sucesso!");
  } catch (error) {
    // Se a conexão falhar, exibe o erro e encerra o processo
    console.error("Erro ao conectar:", error.message);
    process.exit(1); // Encerra a aplicação (código de saída 1 = erro)
  }
};

// Exporta a função para ser chamada no server.js
module.exports = connectDB;