'use strict';

const ClaseRepository = require('../repositories/clase.repository');
const AppError = require('../utils/AppError');
const constants = require('../config/constants');
const { getPagination, getPagingData } = require('../utils/pagination');
const { Op } = require('sequelize');

const ClaseService = {
  getAll: async (query) => {
    const { limit, offset, order, page } = getPagination(query);
    const where = { activo: true };

    if (query.search) {
      where[Op.or] = [
        { nombre: { [Op.iLike]: `%${query.search}%` } },
        { descripcion: { [Op.iLike]: `%${query.search}%` } },
      ];
    }

    const data = await ClaseRepository.findAndCount({ where, limit, offset, order });
    return getPagingData(data, page, limit);
  },

  getById: async (id) => {
    const clase = await ClaseRepository.findById(id);
    if (!clase) throw new AppError(constants.MESSAGES.NOT_FOUND('Clase'), constants.HTTP.NOT_FOUND);
    return clase;
  },

  create: (data) => ClaseRepository.create(data),

  update: async (id, data) => {
    const result = await ClaseRepository.update(id, data);
    if (!result) throw new AppError(constants.MESSAGES.NOT_FOUND('Clase'), constants.HTTP.NOT_FOUND);
    return result;
  },

  softDelete: async (id) => {
    const result = await ClaseRepository.softDelete(id);
    if (!result) throw new AppError(constants.MESSAGES.NOT_FOUND('Clase'), constants.HTTP.NOT_FOUND);
    return { mensaje: constants.MESSAGES.DELETED('Clase') };
  },

  reactivate: async (id) => {
    const result = await ClaseRepository.reactivate(id);
    if (!result) throw new AppError(constants.MESSAGES.NOT_FOUND('Clase'), constants.HTTP.NOT_FOUND);
    return { mensaje: constants.MESSAGES.REACTIVATED('Clase') };
  },
};

module.exports = ClaseService;
