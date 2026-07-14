'use strict';

const HorarioClaseRepository = require('../repositories/horarioclase.repository');
const AppError = require('../utils/AppError');
const constants = require('../config/constants');
const { getPagination, getPagingData } = require('../utils/pagination');

const HorarioClaseService = {
  getAll: async (query) => {
    const { limit, offset, order, page } = getPagination(query);
    const where = {};

    if (query.dia_semana) {
      where.dia_semana = query.dia_semana;
    }
    
    if (query.id_clase) {
      where.id_clase = query.id_clase;
    }

    const data = await HorarioClaseRepository.findAndCount({ where, limit, offset, order });
    return getPagingData(data, page, limit);
  },

  getById: async (id) => {
    const horario = await HorarioClaseRepository.findById(id);
    if (!horario) throw new AppError(constants.MESSAGES.NOT_FOUND('Horario'), constants.HTTP.NOT_FOUND);
    return horario;
  },

  getByClase: (id_clase) => HorarioClaseRepository.findByClase(id_clase),

  create: (data) => HorarioClaseRepository.create(data),

  update: async (id, data) => {
    const result = await HorarioClaseRepository.update(id, data);
    if (!result) throw new AppError(constants.MESSAGES.NOT_FOUND('Horario'), constants.HTTP.NOT_FOUND);
    return result;
  },

  softDelete: async (id) => {
    const result = await HorarioClaseRepository.softDelete(id);
    if (!result) throw new AppError(constants.MESSAGES.NOT_FOUND('Horario'), constants.HTTP.NOT_FOUND);
    return { mensaje: constants.MESSAGES.DELETED('Horario') };
  },

  reactivate: async (id) => {
    const result = await HorarioClaseRepository.reactivate(id);
    if (!result) throw new AppError(constants.MESSAGES.NOT_FOUND('Horario'), constants.HTTP.NOT_FOUND);
    return { mensaje: constants.MESSAGES.REACTIVATED('Horario') };
  },
};

module.exports = HorarioClaseService;
