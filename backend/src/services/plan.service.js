'use strict';

const PlanRepository = require('../repositories/plan.repository');
const AppError = require('../utils/AppError');
const constants = require('../config/constants');
const { getPagination, getPagingData } = require('../utils/pagination');
const { Op } = require('sequelize');

const PlanService = {
  getAll: async (query) => {
    const { limit, offset, order, page } = getPagination(query);
    const where = { activo: true };

    if (query.search) {
      where[Op.or] = [
        { nombre: { [Op.iLike]: `%${query.search}%` } },
        { descripcion: { [Op.iLike]: `%${query.search}%` } },
      ];
    }

    if (query.destacado) {
      where.destacado = query.destacado === 'true';
    }

    const data = await PlanRepository.findAndCount({ where, limit, offset, order });
    return getPagingData(data, page, limit);
  },

  getById: async (id) => {
    const plan = await PlanRepository.findById(id);
    if (!plan) throw new AppError(constants.MESSAGES.NOT_FOUND('Plan'), constants.HTTP.NOT_FOUND);
    return plan;
  },

  create: (data) => PlanRepository.create(data),

  update: async (id, data) => {
    const result = await PlanRepository.update(id, data);
    if (!result) throw new AppError(constants.MESSAGES.NOT_FOUND('Plan'), constants.HTTP.NOT_FOUND);
    return result;
  },

  softDelete: async (id) => {
    const result = await PlanRepository.softDelete(id);
    if (!result) throw new AppError(constants.MESSAGES.NOT_FOUND('Plan'), constants.HTTP.NOT_FOUND);
    return { mensaje: constants.MESSAGES.DELETED('Plan') };
  },

  reactivate: async (id) => {
    const result = await PlanRepository.reactivate(id);
    if (!result) throw new AppError(constants.MESSAGES.NOT_FOUND('Plan'), constants.HTTP.NOT_FOUND);
    return { mensaje: constants.MESSAGES.REACTIVATED('Plan') };
  },

  getStats: async () => {
    const planesActivos = await PlanRepository.countActivos();
    const planMasLargo = await PlanRepository.findLongestPlan();
    const planMasPopular = await PlanRepository.findMostPopularPlan();
    
    return {
      planesActivos,
      planMasLargo,
      planMasPopular
    };
  },
};

module.exports = PlanService;
