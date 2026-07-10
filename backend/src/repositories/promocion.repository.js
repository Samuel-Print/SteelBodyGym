'use strict';

const { Promocion } = require('../models');

const PromocionRepository = {
  findAndCount: (options) => {
    return Promocion.findAndCountAll({
      where: options.where,
      limit: options.limit,
      offset: options.offset,
      order: options.order,
    });
  },

  findAll: () => {
    return Promocion.findAll({
      where: { activo: true },
      order: [['fecha_caducacion', 'ASC']],
    });
  },

  findVigentes: () => {
    const { Op } = require('sequelize');
    return Promocion.findAll({
      where: {
        activo: true,
        fecha_caducacion: { [Op.gte]: new Date() },
      },
      order: [['fecha_caducacion', 'ASC']],
    });
  },

  findById: (id) => {
    return Promocion.findByPk(id);
  },

  create: (data) => {
    return Promocion.create(data);
  },

  update: async (id, data) => {
    const promocion = await Promocion.findByPk(id);
    if (!promocion) return null;
    return promocion.update(data);
  },

  softDelete: async (id) => {
    const promocion = await Promocion.findByPk(id);
    if (!promocion) return null;
    return promocion.update({ activo: false });
  },

  reactivate: async (id) => {
    const promocion = await Promocion.findByPk(id);
    if (!promocion) return null;
    return promocion.update({ activo: true });
  },

  countTotal: () => {
    return Promocion.count();
  },

  countVigentes: () => {
    const { Op } = require('sequelize');
    return Promocion.count({
      where: {
        activo: true,
        fecha_caducacion: { [Op.gte]: new Date() },
      },
    });
  },

  countProntasAVencer: () => {
    const { Op } = require('sequelize');
    const hoy = new Date();
    const proximaSemana = new Date(hoy);
    proximaSemana.setDate(proximaSemana.getDate() + 7);
    
    return Promocion.count({
      where: {
        activo: true,
        fecha_caducacion: {
          [Op.gte]: hoy,
          [Op.lte]: proximaSemana,
        },
      },
    });
  },
};

module.exports = PromocionRepository;
