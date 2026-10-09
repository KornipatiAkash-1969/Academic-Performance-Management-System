import api from './api';

export const loginUser = async (formData) => {
  const response = await api.post('/auth/login', formData);
  return response.data;
};

export const registerUser = async (formData) => {
  const response = await api.post('/auth/register', formData);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get('/auth/profile');
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await api.put('/auth/profile', data);
  return response.data;
};

export const changePassword = async (data) => {
  const response = await api.put('/auth/change-password', data);
  return response.data;
};