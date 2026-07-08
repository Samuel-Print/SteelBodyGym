'use strict';

const create = (req) => {
  const errors = [];
  const { nombre, costo } = req.body;
  if (!nombre || nombre.trim().length < 2) errors.push('El nombre del plan es requerido');
  if (costo === undefined || costo === null || isNaN(Number(costo)) || Number(costo) < 0)
    errors.push('El costo debe ser un número positivo');
  return errors;
};

const update = (req) => {
  const errors = [];
  if (req.body.costo !== undefined && (isNaN(Number(req.body.costo)) || Number(req.body.costo) < 0))
    errors.push('El costo debe ser un número positivo');
  return errors;
};

module.exports = { create, update };
