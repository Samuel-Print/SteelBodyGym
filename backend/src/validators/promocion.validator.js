'use strict';

const create = (req) => {
  const errors = [];
  const { nombre, descripcion, fecha_caducacion } = req.body;
  
  if (!nombre || nombre.trim().length < 2) errors.push('El nombre de la promoción es requerido (mínimo 2 caracteres)');
  if (!descripcion || descripcion.trim().length < 5) errors.push('La descripción es requerida (mínimo 5 caracteres)');
  if (!fecha_caducacion || isNaN(Date.parse(fecha_caducacion))) errors.push('La fecha de caducación es requerida y debe ser válida');
  
  return errors;
};

const update = (req) => {
  const errors = [];
  const { nombre, descripcion, fecha_caducacion } = req.body;
  
  if (nombre !== undefined && nombre.trim().length < 2) errors.push('El nombre debe tener al menos 2 caracteres');
  if (descripcion !== undefined && descripcion.trim().length < 5) errors.push('La descripción debe tener al menos 5 caracteres');
  if (fecha_caducacion !== undefined && isNaN(Date.parse(fecha_caducacion))) errors.push('La fecha de caducación debe ser válida');
  
  return errors;
};

module.exports = {
  create,
  update,
};
