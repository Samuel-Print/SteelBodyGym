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

  countClasesSemanales: async () => {
    return HorarioClase.count({ where: { activo: true } });
  },

  getDuracionMedia: async () => {
    const horarios = await HorarioClase.findAll({
      where: { activo: true },
      attributes: ['hora_inicio', 'hora_fin']
    });

    if (horarios.length === 0) return 0;

    let totalMinutes = 0;
    horarios.forEach(h => {
      const parseTime = (timeStr) => {
        if (!timeStr) return 0;
        const parts = timeStr.split(':');
        return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
      };
      
      const inicio = parseTime(h.hora_inicio);
      const fin = parseTime(h.hora_fin);
      totalMinutes += (fin - inicio);
    });

    return Math.round(totalMinutes / horarios.length); // duracion media en minutos
  },
};

module.exports = ClaseRepository;
