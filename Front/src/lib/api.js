import axios from 'axios';

// CONFIGURAÇÃO: Cria uma instância do Axios com a URL base do backend
// Todos os requests feitos com essa instância irão para 'http://localhost:5000/api'
const api = axios.create({
  baseURL: 'http://localhost:5000/api' // Onde o servidor do backend está ouvindo
});

// Exporta a instância para ser importada em outros componentes
export default api;