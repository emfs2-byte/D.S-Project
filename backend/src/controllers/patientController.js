const Agendamento = require('../models/Agendamento');

// ROTA: AGENDAR NOVA CONSULTA
exports.agendarConsulta = async (req, res) => {
    try {
        // Cria um novo agendamento com os dados enviados pelo frontend
        // Esperado no req.body: nome_paciente, telefone_paciente, setor, data, horario
        const { nome_paciente, telefone_paciente, setor, data, horario } = req.body;

        const novoAgendamento = new Agendamento({ 
            nome_paciente, 
            telefone_paciente, 
            setor, 
            data, 
            horario 
        });

        await novoAgendamento.save();
        
        res.status(201).json({ 
            message: "Consulta agendada com sucesso!", 
            agendamento: novoAgendamento 
        });

    } catch (error) {
        res.status(400).json({ error: "Erro ao realizar agendamento: " + error.message });
    }
};

// ROTA: BUSCAR TODAS AS CONSULTAS
exports.getConsultas = async (req, res) => {
    try {
        const consultas = await Agendamento.find().sort({ data: 1, horario: 1 });
        res.status(200).json(consultas);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar consultas." });
    }
};