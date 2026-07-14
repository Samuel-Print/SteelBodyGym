import api from '@/api/axios';

const getAll = async (params = {}) => {
  const { data } = await api.get('/promociones', { params });
  return data.data;
};

const getById = async (id) => {
  const { data } = await api.get(`/promociones/${id}`);
  return data.data;
};

const create = async (promotion) => {
  const { data } = await api.post('/promociones', promotion);
  return data.data;
};

const update = async (id, promotion) => {
  const { data } = await api.put(`/promociones/${id}`, promotion);
  return data.data;
};

const remove = async (id) => {
  const { data } = await api.delete(`/promociones/${id}`);
  return data;
};

const getStats = async () => {
  const { data } = await api.get('/promociones/stats');
  return data.data;
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
  getStats,
};