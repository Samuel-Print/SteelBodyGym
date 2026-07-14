import api from '@/api/axios';

const BASE_URL = '/sedes';

const getAll = async (params = {}) => {
  const { data } = await api.get(BASE_URL, { params });
  return data.data;
};

const getById = async (id) => {
  const { data } = await api.get(`${BASE_URL}/${id}`);
  return data.data;
};

const create = async (sede) => {
  const { data } = await api.post(BASE_URL, sede);
  return data.data;
};

const update = async (id, sede) => {
  const { data } = await api.put(`${BASE_URL}/${id}`, sede);
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