'use strict';

const { Actividad } = require('../models');

const ActividadRepository = {
  findAndCount: (options) => {
    return Actividad.findAndCountAll({
      where: options.where,
      limit: options.limit,
      offset: options.offset,
      order: options.order,
    });
  },

  findAll: () => {
    return Actividad.findAll({ where: { activo: true }, order: [['id_actividad', 'ASC']] });
  },

  findAllIncludeInactive: () => {
    return Actividad.findAll({ order: [['id_actividad', 'ASC']] });
  },

  findById: (id) => {
    return Actividad.findByPk(id);
  },

  create: (data) => {
    return Actividad.create(data);
  },

  update: async (id, data) => {
    const actividad = await Actividad.findByPk(id);
    if (!actividad) return null;
    return actividad.update(data);
  },

  softDelete: async (id) => {
    const actividad = await Actividad.findByPk(id);
    if (!actividad) return null;
    return actividad.update({ activo: false });
  },

  reactivate: async (id) => {
    const actividad = await Actividad.findByPk(id);
    if (!actividad) return null;
    return actividad.update({ activo: true });
  },
};

module.exports = ActividadRepository;
