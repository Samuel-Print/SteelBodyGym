import api from "@/api/axios";

const login = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);
  return data.data;
};

const register = async (usuario) => {
  const { data } = await api.post("/auth/register", usuario);
  return data.data;
};

const solicitarRecuperacion = async (email) => {
  const { data } = await api.post("/usuarios/solicitar-recuperacion", { email });
  return data;
};

const verificarToken = async (token) => {
  const { data } = await api.get(`/usuarios/verificar-token/${token}`);
  return data.data;
};

const resetearPassword = async (token, nueva_password) => {
  const { data } = await api.put("/usuarios/resetear-password", { token, nueva_password });
  return data;
};

export default {
  login,
  register,
  solicitarRecuperacion,
  verificarToken,
  resetearPassword,
};