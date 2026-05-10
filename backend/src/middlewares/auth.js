const jwt = require('jsonwebtoken'); // biblioteca responsável por criar e ler os tokens

module.exports = (req, res, next) => {
    // O frontend envia o token escondido no cabeçalho. Aqui nós o capturamos.
    const token = req.header('x-auth-token');

    // Se o frontend não mandou o token (ex: usuário não logou), bloqueamos na porta.
    if (!token) {
        return res.status(401).json({ msg: 'Acesso negado. Token não fornecido.' });
    }

    try {
        //O jwt.verify abre o token usando a nossa senha secreta (do arquivo .env).
        // Se alguém tentar forjar um token, essa linha vai falhar e pular para o 'catch'.
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Se deu tudo certo, pegamos o ID do usuário que estava guardado dentro do token
        // e salvamos na variável 'req.user'. Isso é crucial para o próximo passo!
        req.user = decoded.id;
        
        //'next()' é o comando que diz: "Pode passar! O token é válido".
        next();
    } catch (err) {
        //Se o token for falso, tiver sido alterado ou estiver com o tempo expirado, cai aqui.
        res.status(401).json({ msg: 'Token inválido ou expirado.' });
    }
};