import api from '@/api/axios';

const BASE_URL = '/actividades';

const getAll = async (params = {}) => {
  const { data } = await api.get(BASE_URL, { params });
  return data.data;
};

const getById = async (id) => {
  const { data } = await api.get(`${BASE_URL}/${id}`);
  return data.data;
};

const create = async (actividad) => {
  const { data } = await api.post(BASE_URL, actividad);
  return data.data;
};

const update = async (id, actividad) => {
  const { data } = await api.put(`${BASE_URL}/${id}`, actividad);
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