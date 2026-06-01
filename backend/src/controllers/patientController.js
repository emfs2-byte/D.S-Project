const Agendamento = require('../models/Agendamento');

exports.agendarConsulta = async (req, res) => {
    try {
        const { nome_paciente, telefone_paciente, setor, data, horario, responsavel, telefone_responsavel } = req.body;

        const novoAgendamento = new Agendamento({
            nome_paciente,
            telefone_paciente,
            setor,
            data,
            horario,
            responsavel,
            telefone_responsavel
        });
        
        await novoAgendamento.save();
        
        res.status(201).json({
            message: "Consulta agendada com sucesso!",
            agendamento: novoAgendamento
        });

    } catch (error) {
        console.error("Erro ao agendar:", error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                erro: "Nome inválido"
            });
        }
        res.status(500).json({
            erro: "Erro interno ao salvar agendamento."
        });
    }
};

exports.getConsultas = async (req, res) => {
    try {
        const consultas = await Agendamento.find().sort({ data: 1, horario: 1 });
        res.status(200).json(consultas);
    } catch (error) {
        console.error("Erro ao buscar consultas:", error);
        res.status(500).json({ erro: "Erro ao buscar consultas." });
    }
};

exports.editarConsulta = async (req, res) => {
    try {
        const { id } = req.params;
        const atualizacoes = req.body;

        const consultaAtualizada = await Agendamento.findByIdAndUpdate(id, atualizacoes, { new: true });

        if (!consultaAtualizada) {
            return res.status(404).json({ erro: "Consulta não encontrada." });
        }

        res.status(200).json({
            message: "Consulta atualizada com sucesso!",
            agendamento: consultaAtualizada
        });
    } catch (error) {
        console.error("Erro ao editar consulta:", error);
        res.status(500).json({ erro: "Erro ao editar consulta." });
    }
};

exports.cancelarConsulta = async (req, res) => {
    try {
        const { id } = req.params;

        const consultaDeletada = await Agendamento.findByIdAndDelete(id);

        if (!consultaDeletada) {
            return res.status(404).json({ erro: "Consulta não encontrada." });
        }

        res.status(200).json({
            message: "Consulta cancelada com sucesso!"
        });
    } catch (error) {
        console.error("Erro ao cancelar consulta:", error);
        res.status(500).json({ erro: "Erro ao cancelar consulta." });
    }
};