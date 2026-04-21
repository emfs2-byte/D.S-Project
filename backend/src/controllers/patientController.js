const Paciente = require('../models/Paciente');

exports.getPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.find();
        res.status(200).json(pacientes);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar pacientes." });
    }
};

exports.createPaciente = async (req, res) => {
    try {
        const novoPaciente = await Paciente.create(req.body);
        res.status(201).json({ message: "Paciente cadastrado!", paciente: novoPaciente });
    } catch (error) {
        if (error.code === 11000) return res.status(400).json({ error: "CPF já cadastrado." });
        res.status(400).json({ error: error.message });
    }
};