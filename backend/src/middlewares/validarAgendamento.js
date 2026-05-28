// middlewares/validarAgendamento.js
const SETORES_VALIDOS = ['Odontologia', 'Cardiologia', 'Pediatria', 'Ortopedia']; // ajuste conforme seus setores

function validarTelefone(tel) {
    // Aceita formatos: (11)99999-9999 / 11999999999 / +5511999999999
    return /^(\+55)?\d{10,11}$/.test(tel.replace(/[\s\-().]/g, ''));
}

function validarData(dataStr) {
    const data = new Date(dataStr);
    if (isNaN(data.getTime())) return false;

    // Não aceita datas no passado
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    return data >= hoje;
}

function validarHorario(horario) {
    // Aceita formato HH:MM (08:00 até 18:00)
    if (!/^\d{2}:\d{2}$/.test(horario)) return false;
    const [hora, minuto] = horario.split(':').map(Number);
    return hora >= 8 && hora <= 18 && (minuto === 0 || minuto === 30);
}

exports.validarAgendamento = (req, res, next) => {
    const erros = [];
    const { nome_paciente, telefone_paciente, setor, data, horario } = req.body;

    // — Campos obrigatórios —
    if (!nome_paciente?.trim())
        erros.push({ campo: 'nome_paciente', mensagem: 'Nome do paciente é obrigatório.' });

    if (!telefone_paciente?.trim())
        erros.push({ campo: 'telefone_paciente', mensagem: 'Telefone é obrigatório.' });
    else if (!validarTelefone(telefone_paciente))
        erros.push({ campo: 'telefone_paciente', mensagem: 'Telefone inválido.' });

    if (!setor?.trim())
        erros.push({ campo: 'setor', mensagem: 'Setor é obrigatório.' });
    else if (!SETORES_VALIDOS.includes(setor))
        erros.push({ campo: 'setor', mensagem: `Setor inválido. Válidos: ${SETORES_VALIDOS.join(', ')}.` });

    if (!data)
        erros.push({ campo: 'data', mensagem: 'Data é obrigatória.' });
    else if (!validarData(data))
        erros.push({ campo: 'data', mensagem: 'Data inválida ou no passado.' });

    if (!horario?.trim())
        erros.push({ campo: 'horario', mensagem: 'Horário é obrigatório.' });
    else if (!validarHorario(horario))
        erros.push({ campo: 'horario', mensagem: 'Horário inválido. Use HH:MM entre 08:00 e 18:00.' });

    if (erros.length > 0)
        return res.status(422).json({ erro: 'Dados inválidos.', campos: erros });

    next(); 
};