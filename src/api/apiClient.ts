import axios from 'axios';

const apiClient = axios.create({
  timeout: 10000, // Тайм-аут 10 секунд
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;