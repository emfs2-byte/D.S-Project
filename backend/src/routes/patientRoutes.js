const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const auth = require('../middlewares/auth');

router.get('/', auth, patientController.getPacientes);
router.post('/cadastrar', patientController.createPaciente);

module.exports = router;