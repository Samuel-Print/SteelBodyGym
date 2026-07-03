'use strict';

const DIAS_VALIDOS = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];

const create = (req) => {
  const errors = [];
  const { id_clase, dia_semana, hora_inicio, hora_fin } = req.body;
  if (!id_clase) errors.push('El id_clase es requerido');
  if (!dia_semana || !DIAS_VALIDOS.includes(dia_semana))
    errors.push(`El dia_semana debe ser uno de: ${DIAS_VALIDOS.join(', ')}`);
  if (!hora_inicio) errors.push('La hora_inicio es requerida');
  if (!hora_fin) errors.push('La hora_fin es requerida');
  return errors;
};

const update = (req) => {
  const errors = [];
  if (req.body.dia_semana && !DIAS_VALIDOS.includes(req.body.dia_semana))
    errors.push(`El dia_semana debe ser uno de: ${DIAS_VALIDOS.join(', ')}`);
  return errors;
};

module.exports = { create, update };
