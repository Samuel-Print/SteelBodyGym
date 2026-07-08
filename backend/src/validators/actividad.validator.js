'use strict';

const create = (req) => {
  const errors = [];
  const { nombre, sede, horario } = req.body;
  if (!nombre || nombre.trim().length < 2) errors.push('El nombre de la actividad es requerido');
  if (!sede || sede.trim().length < 2) errors.push('La sede es requerida');
  if (!horario) errors.push('El horario es requerido');
  return errors;
};

const update = (req) => {
  const errors = [];
  if (req.body.nombre !== undefined && req.body.nombre.trim().length < 2)
    errors.push('El nombre no puede estar vacío');
  return errors;
};

module.exports = { create, update };
