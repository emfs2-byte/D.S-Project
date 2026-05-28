import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@CliniDesk:token');
  console.log('📤 Interceptor - Token encontrado:', !!token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('📤 Interceptor - Token adicionado ao header');
  }
  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('❌ Erro na requisição:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export const agendarConsulta = async (consulta) => {
  try {
    console.log('📨 Enviando agendamento:', consulta);
    const response = await api.post('/pacientes/agendar', consulta);
    console.log('✅ Agendamento salvo:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao agendar:', error);
    throw error;
  }
};

export const getConsultas = async () => {
  try {
    const response = await api.get('/pacientes/consultas');
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao buscar:', error);
    throw error;
  }
};

export const editarConsulta = async (id, consulta) => {
  const response = await api.put(`/pacientes/consultas/${id}`, consulta);
  return response.data;
};

export const cancelarConsulta = async (id) => {
  const response = await api.delete(`/pacientes/consultas/${id}`);
  return response.data;
};

export default api;