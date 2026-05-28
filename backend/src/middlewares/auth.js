const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log('\n🔍 === MIDDLEWARE AUTH ===');
    console.log('Headers recebidos:', req.headers);

    const authHeader = req.header('Authorization');
    console.log('Authorization header:', authHeader);

    const token = authHeader?.replace('Bearer ', '');
    console.log('Token extraído:', token?.substring(0, 20) + '...');

    if (!token) {
        console.log('❌ Token não fornecido');
        return res.status(401).json({ msg: 'Acesso negado. Token não fornecido.' });
    }

    try {
        console.log('🔐 JWT_SECRET:', process.env.JWT_SECRET);
        console.log('🔐 Verificando token...');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        console.log('✅ Token válido! User:', decoded.id);
        next();
    } catch (err) {
        console.log('❌ Erro ao verificar token:', err.message);
        res.status(401).json({ msg: 'Token inválido ou expirado.' });
    }
};