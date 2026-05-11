const mongoose = require("mongoose");

// FUNÇÃO: Conecta a aplicação ao banco de dados MongoDB
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    
    // Validação da existência da URI de conexão
    if (!uri) {
      throw new Error("MONGO_URI não definida no arquivo .env");
    }

    await mongoose.connect(uri);
    console.log("MongoDB conectado com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar:", error.message);
    
    // Bloqueia o encerramento do processo em ambiente de teste
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    }
  }
};

module.exports = connectDB;