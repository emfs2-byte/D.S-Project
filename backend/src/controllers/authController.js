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
            return res.status(400).json({ error: "Nome de usuário já está em uso"  });
        }
        res.status(500).json({ error: "Erro no banco de dados" });
    }
};


exports.login = async (req, res) => {
    const { username, password } = req.body; 

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ error: "Credenciais inválidas" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).json({ error: "Credenciais inválidas" });

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
// Buscar os dados da recepcionista logada
exports.getMe = async (req, res) => {
    try {
        // No middleware (auth.js) o ID foi salvo em req.user. Vamos usá-lo para bucar no banco. 
        // O comando .select('-password') garante que não vamos enviar a senha de volta.
        const user = await User.findById(req.user).select('-password');

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        // Devolve os dados 
        res.status(200).json({
            id: user._id,
            nome: user.name,
            iniciais: user.username, // 
            cargo: "Recepcionista"   // 
        });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro no servidor ao buscar o perfil" });
        }
};
