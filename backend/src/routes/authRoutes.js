const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);

// Quando o frontend chamar um GET para /me, o Express vai rodar o middleware 'auth' primeiro.
// Se o token estiver correto e não expirado, ele avança para o 'authController.getMe'.
router.get('/me', auth, authController.getMe);

module.exports = router;