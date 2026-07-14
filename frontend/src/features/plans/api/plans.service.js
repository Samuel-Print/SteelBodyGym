import api from '@/api/axios';

const getAll = async (params = {}) => {
  const { data } = await api.get('/planes', { params });
  return data.data;
};

const getById = async (id) => {
  const { data } = await api.get(`/planes/${id}`);
  return data.data;
};

const create = async (plan) => {
  const { data } = await api.post('/planes', plan);
  return data.data;
};

const update = async (id, plan) => {
  const { data } = await api.put(`/planes/${id}`, plan);
  return data.data;
};

const remove = async (id) => {
  const { data } = await api.delete(`/planes/${id}`);
  return data;
};

const reactivate = async (id) => {
  const { data } = await api.patch(`/planes/${id}/reactivate`);
  return data;
};

const getStats = async () => {
  const { data } = await api.get('/planes/stats');
  return data.data;
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
  reactivate,
  getStats,
};