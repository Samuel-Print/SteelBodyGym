'use strict';

const create = (req) => {
  const errors = [];
  if (!req.body.nombre || req.body.nombre.trim().length < 2)
    errors.push('El nombre de la clase es requerido');
  return errors;
};

const update = (req) => {
  const errors = [];
  if (req.body.nombre !== undefined && req.body.nombre.trim().length < 2)
    errors.push('El nombre no puede estar vacío');
  return errors;
};

module.exports = { create, update };
