const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);


const express = require('express');
const cors = require('cors'); // Permite requisições de origens diferentes
require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env

const conectarBanco = require('./config/db'); // Função de conexão com MongoDB
const authRoutes = require('./routes/authRoutes'); // Rotas de autenticação (login, register)
const patientRoutes = require('./routes/patientRoutes'); // Rotas de agendamentos

// INICIALIZAÇÃO DO EXPRESS
const app = express();

app.use(cors());
// Transforma o corpo das requisições em JSON automaticamente
app.use(express.json());

// CONEXÃO COM BANCO DE DADOS
conectarBanco();

// ROTAS DA API
app.use('/api/auth', authRoutes);
app.use('/api/pacientes', patientRoutes);

// ROTA DE TESTE: Verifica se o servidor e banco de dados estão funcionando
app.get('/', (req, res) => {
    res.json({ status: "API Online", db: "Conectado" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;