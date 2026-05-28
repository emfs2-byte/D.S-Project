const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const auth = require('../middlewares/auth');
const { validarAgendamento } = require('../middlewares/validarAgendamento');

router.post('/agendar', auth, validarAgendamento, patientController.agendarConsulta);
router.get('/consultas', auth, patientController.getConsultas);

module.exports = router;