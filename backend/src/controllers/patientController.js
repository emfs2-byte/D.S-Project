const Agendamento = require('../models/Agendamento');

// Funções de Agendamento

exports.agendarConsulta = async (req, res) => {
    try {
        // Criar o agendamento diretamente com os dados do corpo da requisição
        const novoAgendamento = new Agendamento(req.body);

        await novoAgendamento.save();
        res.status(201).json({ message: "Consulta agendada com sucesso!", agendamento: novoAgendamento });

    } catch (error) {
        res.status(400).json({ error: "Erro ao realizar agendamento: " + error.message });
    }
};

exports.getConsultas = async (req, res) => {
    try {
        // Busca todas as consultas cadastradas ordenando por data e horário
        const consultas = await Agendamento.find().sort({ data: 1, horario: 1 });
        res.status(200).json(consultas);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar consultas." });
    }
};

exports.getAppointments = async (req, res) => {
    try {
        const { date, setor } = req.query;
        const filtro = {};

        if (date) {
            const inicio = new Date(date);
            const fim = new Date(date);
            fim.setDate(fim.getDate() + 1);
            filtro.data = { $gte: inicio, $lt: fim };
        }

        if (setor) {
            filtro.setor = setor;
        }

        const consultas = await Agendamento.find(filtro).sort({ data: 1, horario: 1 });
        res.status(200).json(consultas);

    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar agendamentos." });
    }
};