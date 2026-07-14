import api from '@/api/axios';

const BASE_URL = '/clases';

const getAll = async (params = {}) => {
  const { data } = await api.get(BASE_URL, { params });
  return data.data;
};

const getById = async (id) => {
  const { data } = await api.get(`${BASE_URL}/${id}`);
  return data.data;
};

const getHorarios = async (id_clase) => {
  const { data } = await api.get(`${BASE_URL}/${id_clase}/horarios`);
  return data.data;
};

const create = async (clase) => {
  const { data } = await api.post(BASE_URL, clase);
  return data.data;
};

const update = async (id, clase) => {
  const { data } = await api.put(`${BASE_URL}/${id}`, clase);
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
  getHorarios,
  create,
  update,
  remove,
  reactivate,
};