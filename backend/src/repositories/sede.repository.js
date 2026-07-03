'use strict';

const { Sede } = require('../models');

const SedeRepository = {
  findAndCount: (options) => {
    return Sede.findAndCountAll({
      where: options.where,
      limit: options.limit,
      offset: options.offset,
      order: options.order,
    });
  },

  findAll: () => {
    return Sede.findAll({ where: { activo: true }, order: [['id_sede', 'ASC']] });
  },

  findById: (id) => {
    return Sede.findByPk(id);
  },

  create: (data) => {
    return Sede.create(data);
  },

  update: async (id, data) => {
    const sede = await Sede.findByPk(id);
    if (!sede) return null;
    return sede.update(data);
  },

  softDelete: async (id) => {
    const sede = await Sede.findByPk(id);
    if (!sede) return null;
    return sede.update({ activo: false });
  },

  reactivate: async (id) => {
    const sede = await Sede.findByPk(id);
    if (!sede) return null;
    return sede.update({ activo: true });
  },
};

module.exports = SedeRepository;
