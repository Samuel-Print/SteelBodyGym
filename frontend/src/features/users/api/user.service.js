import api from '@/api/axios';

const getAll = async (params = {}) => {
  const { data } = await api.get('/usuarios', { params });
  return data.data;
};

const getById = async (id) => {
  const { data } = await api.get(`/usuarios/${id}`);
  return data.data;
};

const create = async (usuario) => {
  const { data } = await api.post('/usuarios', usuario);
  return data.data;
};

const update = async (id, usuario) => {
  const { data } = await api.put(`/usuarios/${id}`, usuario);
  return data.data;
};

const remove = async (id) => {
  const { data } = await api.delete(`/usuarios/${id}`);
  return data;
};

const reactivate = async (id) => {
  const { data } = await api.put(`/usuarios/${id}/reactivar`);
  return data;
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
  reactivate,
};