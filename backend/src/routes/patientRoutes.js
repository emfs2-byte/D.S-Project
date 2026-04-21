const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.get('/', patientController.getPacientes);
router.post('/cadastrar', patientController.createPaciente);

module.exports = router;