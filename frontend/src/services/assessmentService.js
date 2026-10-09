import api from './api';

export const getAssessments = async () => {
  const response = await api.get('/assessments');
  return response.data;
};

export const createAssessment = async (data) => {
  const response = await api.post('/assessments', data);
  return response.data;
};
