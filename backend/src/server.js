const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const conectarBanco = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');

const app = express();

app.use(cors());
app.use(express.json());

conectarBanco();

app.use('/api/auth', authRoutes);
app.use('/api/pacientes', patientRoutes);

app.get('/', (req, res) => {
    res.json({ status: "API Online", db: "Conectado" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});