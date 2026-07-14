import api from '@/api/axios';

const BASE_URL = '/horarioclases';

const getAll = async (params = {}) => {
  const { data } = await api.get(BASE_URL, { params });
  return data.data;
};

const getById = async (id) => {
  const { data } = await api.get(`${BASE_URL}/${id}`);
  return data.data;
};

const create = async (horario) => {
  const { data } = await api.post(BASE_URL, horario);
  return data.data;
};

const update = async (id, horario) => {
  const { data } = await api.put(`${BASE_URL}/${id}`, horario);
  return data.data;
};

const remove = async (id) => {
  const { data } = await api.delete(`${BASE_URL}/${id}`);
  return data;
};

const reactivate = async (id) => {
  const { data } = await api.put(`${BASE_URL}/${id}/reactivar`);
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