'use strict';

const { Clase, HorarioClase } = require('../models');

const ClaseRepository = {
  findAndCount: (options) => {
    return Clase.findAndCountAll({
      where: options.where,
      limit: options.limit,
      offset: options.offset,
      order: options.order,
      include: [
        {
          model: HorarioClase,
          as: 'horarios',
          where: { activo: true },
          required: false,
        },
      ],
    });
  },

  findAll: () => {
    return Clase.findAll({
      where: { activo: true },
      order: [['id_clase', 'ASC']],
      include: [{ model: HorarioClase, as: 'horarios', where: { activo: true }, required: false }],
    });
  },

  findAllIncludeInactive: () => {
    return Clase.findAll({ order: [['id_clase', 'ASC']] });
  },

  findById: (id) => {
    return Clase.findByPk(id, {
      include: [{ model: HorarioClase, as: 'horarios', required: false }],
    });
  },

  create: (data) => {
    return Clase.create(data);
  },

  update: async (id, data) => {
    const clase = await Clase.findByPk(id);
    if (!clase) return null;
    return clase.update(data);
  },

  softDelete: async (id) => {
    const clase = await Clase.findByPk(id);
    if (!clase) return null;
    return clase.update({ activo: false });
  },

  reactivate: async (id) => {
    const clase = await Clase.findByPk(id);
    if (!clase) return null;
    return clase.update({ activo: true });
  },
};

module.exports = ClaseRepository;
