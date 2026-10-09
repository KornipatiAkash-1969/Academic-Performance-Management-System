import axios from 'axios';

const getBaseUrl = () => {
  // If explicitly configured, use it
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  // If running in production browser (e.g. Vercel), use relative /api proxy to eliminate CORS
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return '/api';
  }
  // Local development fallback
  return 'http://localhost:5000/api';
};

const api = axios.create({
  baseURL: getBaseUrl()
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;