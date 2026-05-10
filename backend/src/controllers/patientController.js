const Agendamento = require('../models/Agendamento');

// ROTA: AGENDAR NOVA CONSULTA
exports.agendarConsulta = async (req, res) => {
    try {
        // Cria um novo agendamento com os dados enviados pelo frontend
        // Esperado no req.body: nome_paciente, telefone_paciente, setor, data, horario
        const novoAgendamento = new Agendamento(req.body);

        // Salva o agendamento no banco de dados
        await novoAgendamento.save();
        
        // Status 201 (Created) = sucesso ao criar novo recurso
        res.status(201).json({ 
            message: "Consulta agendada com sucesso!", 
            agendamento: novoAgendamento 
        });

    } catch (error) {
        // Status 400 (Bad Request) = dados inválidos ou faltando campos obrigatórios
        res.status(400).json({ error: "Erro ao realizar agendamento: " + error.message });
    }
};

// ROTA: BUSCAR TODAS AS CONSULTAS
exports.getConsultas = async (req, res) => {
    try {
        // Busca todas as consultas agendadas ordenadas por data (crescente) e depois por horário
        const consultas = await Agendamento.find().sort({ data: 1, horario: 1 });
        
        // Retorna a lista de consultas em JSON
        res.status(200).json(consultas);
    } catch (error) {
        // Status 500 (Server Error) = erro interno do servidor
        res.status(500).json({ error: "Erro ao buscar consultas." });
    }
};