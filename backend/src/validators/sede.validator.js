'use strict';

const create = (req) => {
  const errors = [];
  const { nombre, direccion, horario_atencion } = req.body;
  if (!nombre || nombre.trim().length < 2) errors.push('El nombre de la sede es requerido');
  if (!direccion || direccion.trim().length < 5) errors.push('La dirección es requerida');
  if (!horario_atencion) errors.push('El horario de atención es requerido');
  return errors;
};

const update = (req) => {
  const errors = [];
  if (req.body.nombre !== undefined && req.body.nombre.trim().length < 2)
    errors.push('El nombre no puede estar vacío');
  return errors;
};

module.exports = { create, update };
