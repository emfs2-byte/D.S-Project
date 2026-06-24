const Agendamento = require('../models/Agendamento');

exports.agendarConsulta = async (req, res) => {
    try {
        const { 
            nome_paciente, telefone_paciente, setor, data, horario, responsavel, 
            telefone_responsavel, dataRetorno, observacaoRetorno, 
            horarioRetorno, setorRetorno, medicoRetorno 
        } = req.body;

        const novoAgendamento = new Agendamento({
            nome_paciente,
            telefone_paciente,
            setor,
            data,
            horario,
            responsavel,
            telefone_responsavel,
            dataRetorno,
            horarioRetorno,
            setorRetorno,
            medicoRetorno,
            observacaoRetorno
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

        // 🔥 LOGS PARA DEBUG 🔥
        console.log('🔍 ===== EDITAR CONSULTA =====');
        console.log('📝 ID recebido:', id);
        console.log('📝 Dados recebidos:', JSON.stringify(atualizacoes, null, 2));
        console.log('📝 Tipo do ID:', typeof id);

        // Verifica se o ID é válido
        if (!id || id === 'undefined' || id === 'null') {
            console.log('❌ ID inválido!');
            return res.status(400).json({ erro: "ID da consulta é obrigatório." });
        }

        const consultaAtualizada = await Agendamento.findByIdAndUpdate(
            id, 
            atualizacoes, 
            { new: true, runValidators: true }
        );

        if (!consultaAtualizada) {
            console.log('❌ Consulta não encontrada para o ID:', id);
            return res.status(404).json({ erro: "Consulta não encontrada." });
        }

        console.log('✅ Consulta atualizada com sucesso!');
        console.log('📝 Dados atualizados:', JSON.stringify(consultaAtualizada, null, 2));

        res.status(200).json({
            message: "Consulta atualizada com sucesso!",
            agendamento: consultaAtualizada
        });
    } catch (error) {
        console.error("❌ Erro ao editar consulta:", error);
        console.error("❌ Stack:", error.stack);
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

exports.salvarRetorno = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            dataRetorno, observacaoRetorno, horarioRetorno, 
            setorRetorno, medicoRetorno 
        } = req.body;

        const consultaAtualizada = await Agendamento.findByIdAndUpdate(
            id,
            { dataRetorno, observacaoRetorno, horarioRetorno, setorRetorno, medicoRetorno },
            { new: true, runValidators: true }
        );

        if (!consultaAtualizada) {
            return res.status(404).json({ erro: "Consulta não encontrada." });
        }

        res.status(200).json({
            message: "Retorno registrado com sucesso!",
            agendamento: consultaAtualizada
        });
    } catch (error) {
        console.error("Erro ao salvar retorno:", error);
        res.status(500).json({ erro: "Erro ao registrar data de retorno." });
    }
};

exports.getRetornos = async (req, res) => {
    try {
        const { data } = req.query;

        if (!data) {
            return res.status(400).json({ erro: "O parâmetro 'data' é obrigatório no formato YYYY-MM-DD." });
        }

        const inicioDoDia = new Date(data);
        inicioDoDia.setUTCHours(0, 0, 0, 0);

        const fimDoDia = new Date(data);
        fimDoDia.setUTCHours(23, 59, 59, 999);

        const retornos = await Agendamento.find({
            dataRetorno: {
                $gte: inicioDoDia,
                $lte: fimDoDia
            }
        }).sort({ horario: 1 });

        res.status(200).json(retornos);
    } catch (error) {
        console.error("Erro ao buscar retornos:", error);
        res.status(500).json({ erro: "Erro interno ao buscar lista de retornos." });
    }
};