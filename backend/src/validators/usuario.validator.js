'use strict';

const create = (req) => {
  const errors = [];
  const { nombre, email, password } = req.body;
  if (!nombre || nombre.trim().length < 2) errors.push('El nombre es requerido (mínimo 2 caracteres)');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('El email no es válido');
  if (!password || password.length < 6) errors.push('La contraseña debe tener al menos 6 caracteres');
  return errors;
};

const update = (req) => {
  const errors = [];
  if (req.body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email))
    errors.push('El email no es válido');
  if (req.body.password && req.body.password.length < 6)
    errors.push('La contraseña debe tener al menos 6 caracteres');
  return errors;
};

module.exports = { create, update };
