'use strict';

const SedeRepository = require('../repositories/sede.repository');
const AppError = require('../utils/AppError');
const constants = require('../config/constants');
const { getPagination, getPagingData } = require('../utils/pagination');
const { Op } = require('sequelize');

const SedeService = {
  getAll: async (query) => {
    const { limit, offset, order, page } = getPagination(query);
    const where = { activo: true };

    if (query.search) {
      where[Op.or] = [
        { nombre: { [Op.iLike]: `%${query.search}%` } },
        { direccion: { [Op.iLike]: `%${query.search}%` } },
      ];
    }

    if (query.nombre) {
      where.nombre = { [Op.iLike]: `%${query.nombre}%` };
    }

    const data = await SedeRepository.findAndCount({ where, limit, offset, order });
    return getPagingData(data, page, limit);
  },

  getById: async (id) => {
    const sede = await SedeRepository.findById(id);
    if (!sede) throw new AppError(constants.MESSAGES.NOT_FOUND('Sede'), constants.HTTP.NOT_FOUND);
    return sede;
  },

  create: (data) => SedeRepository.create(data),

  update: async (id, data) => {
    const sede = await SedeRepository.update(id, data);
    if (!sede) throw new AppError(constants.MESSAGES.NOT_FOUND('Sede'), constants.HTTP.NOT_FOUND);
    return sede;
  },

  softDelete: async (id) => {
    const result = await SedeRepository.softDelete(id);
    if (!result) throw new AppError(constants.MESSAGES.NOT_FOUND('Sede'), constants.HTTP.NOT_FOUND);
    return { mensaje: constants.MESSAGES.DELETED('Sede') };
  },

  reactivate: async (id) => {
    const result = await SedeRepository.reactivate(id);
    if (!result) throw new AppError(constants.MESSAGES.NOT_FOUND('Sede'), constants.HTTP.NOT_FOUND);
    return { mensaje: constants.MESSAGES.REACTIVATED('Sede') };
  },
};

module.exports = SedeService;
