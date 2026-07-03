'use strict';

const ActividadRepository = require('../repositories/actividad.repository');
const AppError = require('../utils/AppError');
const constants = require('../config/constants');
const { getPagination, getPagingData } = require('../utils/pagination');
const { Op } = require('sequelize');

const ActividadService = {
  getAll: async (query) => {
    const { limit, offset, order, page } = getPagination(query);
    const where = { activo: true };

    if (query.search) {
      where[Op.or] = [
        { nombre: { [Op.iLike]: `%${query.search}%` } },
        { sede: { [Op.iLike]: `%${query.search}%` } },
        { descripcion: { [Op.iLike]: `%${query.search}%` } },
      ];
    }

    if (query.sede) {
      where.sede = { [Op.iLike]: `%${query.sede}%` };
    }

    const data = await ActividadRepository.findAndCount({ where, limit, offset, order });
    return getPagingData(data, page, limit);
  },

  getById: async (id) => {
    const actividad = await ActividadRepository.findById(id);
    if (!actividad) throw new AppError(constants.MESSAGES.NOT_FOUND('Actividad'), constants.HTTP.NOT_FOUND);
    return actividad;
  },

  create: (data) => ActividadRepository.create(data),

  update: async (id, data) => {
    const result = await ActividadRepository.update(id, data);
    if (!result) throw new AppError(constants.MESSAGES.NOT_FOUND('Actividad'), constants.HTTP.NOT_FOUND);
    return result;
  },

  softDelete: async (id) => {
    const result = await ActividadRepository.softDelete(id);
    if (!result) throw new AppError(constants.MESSAGES.NOT_FOUND('Actividad'), constants.HTTP.NOT_FOUND);
    return { mensaje: constants.MESSAGES.DELETED('Actividad') };
  },

  reactivate: async (id) => {
    const result = await ActividadRepository.reactivate(id);
    if (!result) throw new AppError(constants.MESSAGES.NOT_FOUND('Actividad'), constants.HTTP.NOT_FOUND);
    return { mensaje: constants.MESSAGES.REACTIVATED('Actividad') };
  },
};

module.exports = ActividadService;
