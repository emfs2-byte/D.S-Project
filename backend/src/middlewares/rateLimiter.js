const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
    windowMs: 15 * 60 * 1000,  // janela de 15 minutos
    max: 10,                    // máximo 10 tentativas por IP
    message: { erro: 'Muitas tentativas. Tente novamente em 15 minutos.' },
    standardHeaders: true,
    legacyHeaders: false
});