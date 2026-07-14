'use strict';

const { HorarioClase, Clase } = require('../models');

const HorarioClaseRepository = {
  findAndCount: (options) => {
    return HorarioClase.findAndCountAll({
      where: options.where,
      limit: options.limit,
      offset: options.offset,
      order: options.order,
      include: [{ model: Clase, as: 'clase', required: false }],
    });
  },

  findAll: () => {
    return HorarioClase.findAll({
      order: [['id_horario', 'ASC']],
      include: [{ model: Clase, as: 'clase', required: false }],
    });
  },

  findById: (id) => {
    return HorarioClase.findByPk(id, {
      include: [{ model: Clase, as: 'clase', required: false }],
    });
  },

  findByClase: (id_clase) => {
    return HorarioClase.findAll({ where: { id_clase, activo: true } });
  },

  create: (data) => {
    return HorarioClase.create(data);
  },

  update: async (id, data) => {
    const horario = await HorarioClase.findByPk(id);
    if (!horario) return null;
    return horario.update(data);
  },

  softDelete: async (id) => {
    const horario = await HorarioClase.findByPk(id);
    if (!horario) return null;
    return horario.update({ activo: false });
  },

  reactivate: async (id) => {
    const horario = await HorarioClase.findByPk(id);
    if (!horario) return null;
    return horario.update({ activo: true });
  },
};

module.exports = HorarioClaseRepository;
