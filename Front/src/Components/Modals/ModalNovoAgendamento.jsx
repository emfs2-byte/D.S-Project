import React, { useState } from 'react';
import { X } from 'lucide-react';
import { agendarConsulta } from '../../lib/api';
import DatePicker from 'react-datepicker';
import { registerLocale } from "react-datepicker";
import ptBR from 'date-fns/locale/pt-BR';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import './ModalNovoAgendamento.css';

registerLocale('pt-BR', ptBR);

const ModalNovoAgendamento = ({ onClose, onSave, clinicas, isRetorno = false }) => {
  const [formData, setFormData] = useState({
    nome_paciente: '',
    responsavel: '',
    telefone_paciente: '',
    telefone_responsavel: '',
    setor: clinicas[0]?.nome || '',
    data: new Date(),
    horario: '',
    //Campos extras se for um retorno direto + definição do 'tipo'
    tipo: isRetorno ? 'Retorno' : 'Consulta',
    medico: '',
    observacao: '',
    dataRetorno: "",
    observacaoRetorno: "",
    horarioRetorno: "",
    setorRetorno: "",
    medicoRetorno: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Preparamos o objeto base com todos os dados atuais do formulário
      let dadosProntosParaOBanco = {
        ...formData,
        data: format(formData.data, 'yyyy-MM-dd'),
        tipo: isRetorno ? 'Retorno' : 'Consulta',
        isRetorno: isRetorno 
      };

      if (isRetorno) {
        //SE FOR RETORNO DIRETO:
        dadosProntosParaOBanco.dataRetorno = format(formData.data, 'yyyy-MM-dd');
        dadosProntosParaOBanco.horarioRetorno = formData.horario;
        dadosProntosParaOBanco.setorRetorno = formData.setor;
        
        //Sincroniza o médico e observação com os campos que o backend exige para retornos
        dadosProntosParaOBanco.medicoRetorno = formData.medico;
        dadosProntosParaOBanco.observacaoRetorno = formData.observacao;
        
      } else {
        //SE FOR CONSULTA NORMAL COM RETORNO OPCIONAL:
        dadosProntosParaOBanco.dataRetorno = formData.dataRetorno || null;
        dadosProntosParaOBanco.horarioRetorno = formData.horarioRetorno || null;
        dadosProntosParaOBanco.setorRetorno = formData.setorRetorno || null;
        dadosProntosParaOBanco.medicoRetorno = formData.medicoRetorno || null;
        dadosProntosParaOBanco.observacaoRetorno = formData.observacaoRetorno || null;
      }
      
      console.log("DADOS CORRIGIDOS INDO PRO BANCO:", dadosProntosParaOBanco);
      const resultado = await agendarConsulta(dadosProntosParaOBanco);
      
      alert(`${isRetorno ? 'Retorno' : 'Agendamento'} salvo com sucesso!`);
      
      const dadoFinal = resultado.agendamento || resultado;
      onSave({ ...dadoFinal, tipo: isRetorno ? 'Retorno' : 'Consulta', isRetorno: isRetorno });
      onClose(); // Fecha o modal após salvar com sucesso

    } catch (error) {
      console.error("❌ Erro ao salvar:", error);
      alert("Erro ao salvar. Verifique o erro.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <button onClick={onClose} className="btn-close" style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold">
            {isRetorno ? 'Novo Retorno' : 'Novo Agendamento'}
          </h2>
          <p className="opacity-90">
            {isRetorno 
              ? 'Preencha os dados para agendar um retorno diretamente.' 
              : 'Preencha os dados para agendar uma nova consulta.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-grid">
            <div className="input-group">
              <label className="input-label">Paciente *</label>
              <input required className="form-input" placeholder="Nome do paciente" onChange={(e) => setFormData({...formData, nome_paciente: e.target.value})} />
            </div>

            <div className="input-group">
              <label className="input-label">Responsável *</label>
              <input required className="form-input" placeholder="Nome do responsável" onChange={(e) => setFormData({...formData, responsavel: e.target.value})} />
            </div>

            <div className="input-group">
              <label className="input-label">Tel. Paciente</label>
              <input className="form-input" placeholder="+55 (81) 99999-0000" onChange={(e) => setFormData({...formData, telefone_paciente: e.target.value})} />
            </div>

            <div className="input-group">
              <label className="input-label">Tel. Responsável *</label>
              <input required className="form-input" placeholder="+55 (81) 99999-0000" onChange={(e) => setFormData({...formData, telefone_responsavel: e.target.value})} />
            </div>

            <div className="input-group full-width">
              <label className="input-label">Setor *</label>
              <select className="form-select" value={formData.setor} onChange={(e) => setFormData({...formData, setor: e.target.value})}>
                {clinicas.map((clinica, index) => (
                  <option key={index} value={clinica.nome}>{clinica.nome}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Data *</label>
              <DatePicker selected={formData.data} onChange={(date) => setFormData({ ...formData, data: date })} locale="pt-BR" dateFormat="dd/MM/yyyy" className="form-input" />
            </div>

            <div className="input-group">
              <label className="input-label">Horário *</label>
              <input type="time" required className="form-input" value={formData.horario || ""} onChange={(e) => setFormData({...formData, horario: e.target.value})} />
            </div>

            {isRetorno && (
              <>
                <div className="input-group">
                  <label className="input-label">Médico</label>
                  <input className="form-input" placeholder="Nome do médico" onChange={(e) => setFormData({...formData, medico: e.target.value})} />
                </div>
                <div className="input-group">
                  <label className="input-label">Observações</label>
                  <input className="form-input" placeholder="Ex: Trazer exames..." onChange={(e) => setFormData({...formData, observacao: e.target.value})} />
                </div>
              </>
            )}
          </div>

          {!isRetorno && (
            <div className="retorno-section" style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px dashed #cbd5e1' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '10px' }}>
                Configuração de Retorno (Opcional)
              </h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div className="form-group">
                  <label style={{ fontSize: '12px', fontWeight: '500' }}>Data</label>
                  <input type="date" className="form-input" onChange={(e) => setFormData({...formData, dataRetorno: e.target.value})} />
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '12px', fontWeight: '500' }}>Horário</label>
                  <input type="time" className="form-input" value={formData.horarioRetorno || ""} onChange={(e) => setFormData({...formData, horarioRetorno: e.target.value})} />
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '12px', fontWeight: '500' }}>Médico</label>
                  <input type="text" className="form-input" placeholder="Nome do médico" onChange={(e) => setFormData({...formData, medicoRetorno: e.target.value})} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="form-group">
                  <label style={{ fontSize: '12px', fontWeight: '500' }}>Setor</label>
                  <select className="form-select" onChange={(e) => setFormData({...formData, setorRetorno: e.target.value})}>
                    <option value="">Selecione um setor...</option>
                    {clinicas.map((c, i) => <option key={i} value={c.nome}>{c.nome}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '12px', fontWeight: '500' }}>Observações</label>
                  <input type="text" className="form-input" placeholder="Trazer exames..." onChange={(e) => setFormData({...formData, observacaoRetorno: e.target.value})} />
                </div>
              </div>
            </div>
          )}

          <div className="modal-footer" style={{ marginTop: '20px' }}>
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancelar
            </button>
            <button type="submit" className="btn-submit">
              Agendar
            </button>
          </div>
        </form>
        <div style={{ textAlign: 'center', paddingBottom: '1rem', fontSize: '0.7rem', color: '#cbd5e1' }}>CliniDesk</div>
      </div>
    </div>
  );
};

export default ModalNovoAgendamento;