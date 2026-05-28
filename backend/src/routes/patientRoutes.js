const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const auth = require('../middlewares/auth');
const { validarAgendamento } = require('../middlewares/validarAgendamento');

router.post('/agendar', auth, validarAgendamento, patientController.agendarConsulta);
router.get('/consultas', auth, patientController.getConsultas);
router.put('/consultas/:id', auth, patientController.editarConsulta);
router.delete('/consultas/:id', auth, patientController.cancelarConsulta);

module.exports = router;