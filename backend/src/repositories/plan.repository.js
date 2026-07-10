'use strict';

const { Plan } = require('../models');

const PlanRepository = {
  findAndCount: (options) => {
    return Plan.findAndCountAll({
      where: options.where,
      limit: options.limit,
      offset: options.offset,
      order: options.order,
    });
  },

  findAll: () => {
    return Plan.findAll({ where: { activo: true }, order: [['orden_display', 'ASC'], ['id_plan', 'ASC']] });
  },

  findAllIncludeInactive: () => {
    return Plan.findAll({ order: [['orden_display', 'ASC']] });
  },

  findById: (id) => {
    return Plan.findByPk(id);
  },

  create: (data) => {
    return Plan.create(data);
  },

  update: async (id, data) => {
    const plan = await Plan.findByPk(id);
    if (!plan) return null;
    return plan.update(data);
  },

  softDelete: async (id) => {
    const plan = await Plan.findByPk(id);
    if (!plan) return null;
    return plan.update({ activo: false });
  },

  reactivate: async (id) => {
    const plan = await Plan.findByPk(id);
    if (!plan) return null;
    return plan.update({ activo: true });
  },

  countActivos: () => {
    return Plan.count({ where: { activo: true } });
  },

  findLongestPlan: () => {
    return Plan.findOne({
      where: { activo: true },
      order: [['tiempo_meses', 'DESC']],
    });
  },

  findMostPopularPlan: () => {
    // Como no hay modelo de suscripciones, retornamos el primer plan destacado por defecto
    return Plan.findOne({
      where: { activo: true, destacado: true },
    }).then(plan => {
      // Si no hay destacados, retornar el primero
      if (!plan) {
        return Plan.findOne({ where: { activo: true } });
      }
      return plan;
    });
  },
};

module.exports = PlanRepository;
