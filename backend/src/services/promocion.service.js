'use strict';

const PromocionRepository = require('../repositories/promocion.repository');
const AppError = require('../utils/AppError');
const constants = require('../config/constants');
const { getPagination, getPagingData } = require('../utils/pagination');
const { Op } = require('sequelize');

const PromocionService = {
  getAll: async (query) => {
    const { limit, offset, order, page } = getPagination(query);
    const where = { activo: true };

    if (query.search) {
      where[Op.or] = [
        { nombre: { [Op.iLike]: `%${query.search}%` } },
        { descripcion: { [Op.iLike]: `%${query.search}%` } },
      ];
    }

    if (query.vigentes === 'true') {
      where.fecha_caducacion = { [Op.gte]: new Date() };
    }

    const data = await PromocionRepository.findAndCount({ where, limit, offset, order });
    return getPagingData(data, page, limit);
  },

  getVigentes: () => PromocionRepository.findVigentes(),

  getById: async (id) => {
    const promocion = await PromocionRepository.findById(id);
    if (!promocion) throw new AppError(constants.MESSAGES.NOT_FOUND('Promoción'), constants.HTTP.NOT_FOUND);
    return promocion;
  },

  create: (data) => PromocionRepository.create(data),

  update: async (id, data) => {
    const result = await PromocionRepository.update(id, data);
    if (!result) throw new AppError(constants.MESSAGES.NOT_FOUND('Promoción'), constants.HTTP.NOT_FOUND);
    return result;
  },

  softDelete: async (id) => {
    const result = await PromocionRepository.softDelete(id);
    if (!result) throw new AppError(constants.MESSAGES.NOT_FOUND('Promoción'), constants.HTTP.NOT_FOUND);
    return { mensaje: constants.MESSAGES.DELETED('Promoción') };
  },

  reactivate: async (id) => {
    const result = await PromocionRepository.reactivate(id);
    if (!result) throw new AppError(constants.MESSAGES.NOT_FOUND('Promoción'), constants.HTTP.NOT_FOUND);
    return { mensaje: constants.MESSAGES.REACTIVATED('Promoción') };
  },
};

module.exports = PromocionService;
