import axios from 'axios';

const getBaseUrl = () => {
  // In production (on Vercel), always use same-origin '/api'
  // which is proxied by frontend/vercel.json directly to the backend.
  // This guarantees zero CORS issues, no mixed-content, and 100% reliable connectivity.
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return '/api';
  }
  // Local development fallback
  return process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
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