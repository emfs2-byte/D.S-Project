import axios from 'axios';

const api = axios.create({
    baseURL: '/npi/api',
    withCredentials: true
});

// Interceptor de resposta: redireciona para login quando a sessão expira
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Sessão expirada ou inválida: redireciona para login
            window.location.href = '/npi/';
        }
        return Promise.reject(error);
    }
);

export const agendarConsulta = async (consulta) => {
    const response = await api.post('/pacientes/agendar', consulta);
    return response.data;
};

export const getConsultas = async () => {
    const response = await api.get('/pacientes/consultas');
    return response.data;
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