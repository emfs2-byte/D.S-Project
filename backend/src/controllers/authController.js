const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    try {
        const novoUsuario = await User.create({
            name,
            username,
            password
        });

        res.status(201).json({
            message: "Usuário registrado com sucesso!",
            dados: { id: novoUsuario._id, name, username }
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: "Este e-mail já está cadastrado" });
        }
        res.status(500).json({ error: "Erro no banco de dados" });
    }
};


exports.login = async (req, res) => {
    const { username, password } = req.body; 

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ error: "Usuário não encontrado" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).json({ error: "Senha incorreta" });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );
        
        res.status(200).json({
            message: "Login realizado com sucesso",
            token: token 
        });

    } catch (error) {
        res.status(500).json({ error: "Erro no servidor" });
    }
};