const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const auth = require('../middlewares/auth');

// Rotas de Consultas/Agendamentos
router.post('/agendar', auth, patientController.agendarConsulta);
router.get('/consultas', auth, patientController.getConsultas);

module.exports = router;