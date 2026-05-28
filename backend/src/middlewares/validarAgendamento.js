const SETORES_VALIDOS = [
  'Geriatria',
  'Clínica Médica',
  'Enfermagem',
  'Nutrição',
  'Psicologia',
  'Serviço Social',
  'Fisioterapia',
  'Terapia Ocupacional',
  'Fonoaudiologia',
  'Odonto'
];

function validarTelefone(tel) {
    return /^(\+55)?\d{10,11}$/.test(tel.replace(/[\s\-().]/g, ''));
}

function validarData(dataStr) {
    // Trata strings no formato YYYY-MM-DD
    if (typeof dataStr === 'string' && dataStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const [ano, mes, dia] = dataStr.split('-').map(Number);
        const data = new Date(ano, mes - 1, dia);
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        console.log('📅 Data recebida:', dataStr, '| Data parseada:', data, '| Hoje:', hoje);
        return data >= hoje;
    }
    return false;
}

function validarHorario(horario) {
    if (!/^\d{2}:\d{2}$/.test(horario)) return false;
    const [hora, minuto] = horario.split(':').map(Number);
    return hora >= 8 && hora <= 18 && (minuto === 0 || minuto === 30);
}

exports.validarAgendamento = (req, res, next) => {
    const erros = [];
    const { nome_paciente, telefone_paciente, responsavel, telefone_responsavel, setor, data, horario } = req.body;

    console.log('📋 Validando agendamento:', { nome_paciente, setor, data, horario });

    if (!nome_paciente?.trim())
        erros.push({ campo: 'nome_paciente', mensagem: 'Nome do paciente é obrigatório.' });

    if (!responsavel?.trim())
        erros.push({ campo: 'responsavel', mensagem: 'Nome do responsável é obrigatório.' });

    if (!telefone_paciente?.trim())
        erros.push({ campo: 'telefone_paciente', mensagem: 'Telefone é obrigatório.' });
    else if (!validarTelefone(telefone_paciente))
        erros.push({ campo: 'telefone_paciente', mensagem: 'Telefone inválido.' });

    if (!telefone_responsavel?.trim())
        erros.push({ campo: 'telefone_responsavel', mensagem: 'Telefone do responsável é obrigatório.' });
    else if (!validarTelefone(telefone_responsavel))
        erros.push({ campo: 'telefone_responsavel', mensagem: 'Telefone do responsável inválido.' });

    if (!setor?.trim())
        erros.push({ campo: 'setor', mensagem: 'Setor é obrigatório.' });
    else if (!SETORES_VALIDOS.includes(setor)) {
        console.log('❌ Setor inválido:', setor, 'Válidos:', SETORES_VALIDOS);
        erros.push({ campo: 'setor', mensagem: `Setor inválido. Válidos: ${SETORES_VALIDOS.join(', ')}.` });
    }

    if (!data)
        erros.push({ campo: 'data', mensagem: 'Data é obrigatória.' });
    else if (!validarData(data)) {
        console.log('❌ Data inválida ou no passado:', data);
        erros.push({ campo: 'data', mensagem: 'Data inválida ou no passado.' });
    }

    if (!horario?.trim())
        erros.push({ campo: 'horario', mensagem: 'Horário é obrigatório.' });
    else if (!validarHorario(horario))
        erros.push({ campo: 'horario', mensagem: 'Horário inválido. Use HH:MM entre 08:00 e 18:00.' });

    if (erros.length > 0) {
        console.log('❌ Validação falhou:', erros);
        return res.status(422).json({ erro: 'Dados inválidos.', campos: erros });
    }

    console.log('✅ Validação passou!');
    next();
};