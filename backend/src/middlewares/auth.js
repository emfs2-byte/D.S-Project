const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ msg: 'Acesso negado. Token não fornecido.' });
    }

    try {
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = tokenData.id;

    next();
} catch (err) {
    res.clearCookie('token');

    return res.status(401).json({
        msg: 'Sessão expirada. Faça login novamente.'
    });
    }
};