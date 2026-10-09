import api from './api';

export const addMarks = async (formData) => {
  const response = await api.post('/marks', formData);
  return response.data;
};

export const getMarks = async () => {
  const response = await api.get('/marks');
  return response.data;
};

export const getStudentMarks = async () => {
  const response = await api.get('/marks/student');
  return response.data;
};

export const deleteMark = async (id) => {
  const response = await api.delete(`/marks/${id}`);
  return response.data;
};