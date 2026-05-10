const User = require('../models/User');
const jwt = require('jsonwebtoken');

// ROTA: REGISTRO DE USUÁRIO (CRIAR CONTA)
exports.register = async (req, res) => {
    // Extrai os dados enviados no corpo da requisição 
    const { name, username, password } = req.body;

    // Verifica se algum campo ficou em branco
    if (!name || !username || !password) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    try {
        // Cria e salva o novo usuário no banco de dados
        // A senha será criptografada automaticamente pelo model (User.js)
        const novoUsuario = await User.create({
            name,
            username,
            password
        });

        // Devolve Status 201 (Created) com os dados do usuário criado
        res.status(201).json({
            message: "Usuário registrado com sucesso!",
            dados: { id: novoUsuario._id, name, username }
        });

    } catch (error) {
        // Tratamento de Erros Específicos
        if (error.code === 11000) {
            return res.status(400).json({ error: "Nome de usuário já está em uso"  });
        }
        // Qualquer outro erro retorna Status 500 (Erro interno do servidor)
        res.status(500).json({ error: "Erro no banco de dados" });
    }
};

// ROTA: LOGIN (ENTRAR NO SISTEMA)
exports.login = async (req, res) => {
    // Extrai username e password do corpo da requisição
    const { username, password } = req.body; 

    try {
        // Busca o usuário no banco de dados pelo username
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ error: "Credenciais inválidas" });

        // Valida se a senha está correta comparando com a senha criptografada no banco
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).json({ error: "Credenciais inválidas" });

        // Gera o token JWT com ID do usuário e tempo de expiração
        const token = jwt.sign(
            { id: user._id },               // Payload: ID do usuário dentro do token
            process.env.JWT_SECRET,         // Chave Secreta: Variável de ambiente (.env)
            { expiresIn: '8h' }             // Expiração: O token válido por 8 horas
        );
        
        // Devolve Status 200 (OK) com o token gerado
        res.status(200).json({
            message: "Login realizado com sucesso",
            token: token 
        });

    } catch (error) {
        res.status(500).json({ error: "Erro no servidor" });
    }
};

// ROTA: PERFIL (BUSCAR DADOS DE QUEM ESTÁ LOGADO)
exports.getMe = async (req, res) => {
    try {
        // Busca os dados do usuário usando o ID inserido em req.user pelo middleware de autenticação
        // O .select('-password') é uma medida de segurança para NÃO retornar a senha
        const user = await User.findById(req.user).select('-password');

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        // Devolve Status 200 (OK) com os dados formatados para o Front-end
        res.status(200).json({
            id: user._id,
            nome: user.name,
            iniciais: user.username,
            cargo: "Recepcionista"
        });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro no servidor ao buscar o perfil" });
        }
};
