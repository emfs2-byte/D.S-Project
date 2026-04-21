const User = require('../models/user');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    try {
        const novoUsuario = await User.create({
            name,
            email,
            password 
        });

        res.status(201).json({
            message: "Usuário registrado no MongoDB com sucesso!",
            dados: { id: novoUsuario._id, name, email }
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: "Este e-mail já está cadastrado." });
        }
        res.status(500).json({ error: "Erro ao salvar no banco de dados." });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    try {
        console.log(`Log: Tentativa de acesso para o email ${email}`);
        
        res.status(200).json({
            message: "Rota de login acessada. Aguardando integração de segurança.",
            usuario: email
        });
    } catch (error) {
        res.status(500).json({ error: "Erro no servidor durante o login." });
    }
};