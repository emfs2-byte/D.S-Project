import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api' // Onde o servidor do backend está ouvindo
});

export default api;