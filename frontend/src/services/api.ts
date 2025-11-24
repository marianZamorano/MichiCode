import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  shortenUrl: (originalUrl: string) =>
    api.post('/shorten', { originalUrl }),

  getAllUrls: () => api.get('/urls'),
};

export default api;