'use strict';

/**
 * auth.validator.js
 * Funciones validadoras para los endpoints de autenticación.
 * Retornan un array de strings con los mensajes de error encontrados.
 */

const register = (req) => {
  const errors = [];
  const { nombre, email, password } = req.body;

  if (!nombre || nombre.trim().length < 2) errors.push('El nombre debe tener al menos 2 caracteres');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('El email no es válido');
  if (!password || password.length < 6) errors.push('La contraseña debe tener al menos 6 caracteres');

  return errors;
};

const login = (req) => {
  const errors = [];
  const { email, password } = req.body;

  if (!email) errors.push('El email es requerido');
  if (!password) errors.push('La contraseña es requerida');

  return errors;
};

module.exports = { register, login };
