import api from './api';

export const getNotes = async (targetRole) => {
  const url = targetRole ? `/notes?target_role=${encodeURIComponent(targetRole)}` : '/notes';
  const response = await api.get(url);
  return response.data;
};

export const createNote = async (data) => {
  const response = await api.post('/notes', data);
  return response.data;
};

export const deleteNote = async (id) => {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
};