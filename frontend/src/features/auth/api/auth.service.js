import api from "@/api/axios";

const login = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);
  return data.data;
};

const register = async (usuario) => {
  const { data } = await api.post("/auth/register", usuario);
  return data.data;
};

export default {
  login,
  register,
};