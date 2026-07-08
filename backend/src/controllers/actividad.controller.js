'use strict';

const ActividadService = require('../services/actividad.service');
const { sendSuccess, sendCreated } = require('../utils/response');
const asyncHandler = require('../utils/asyncHandler');

const ActividadController = {
  getAll: asyncHandler(async (req, res) => {
    const data = await ActividadService.getAll(req.query);
    return sendSuccess(res, data);
  }),

  getById: asyncHandler(async (req, res) => {
    const actividad = await ActividadService.getById(req.params.id);
    return sendSuccess(res, actividad);
  }),

  create: asyncHandler(async (req, res) => {
    const actividad = await ActividadService.create(req.body);
    return sendCreated(res, actividad);
  }),

  update: asyncHandler(async (req, res) => {
    const actividad = await ActividadService.update(req.params.id, req.body);
    return sendSuccess(res, actividad, 'Actividad actualizada correctamente');
  }),

  softDelete: asyncHandler(async (req, res) => {
    const result = await ActividadService.softDelete(req.params.id);
    return sendSuccess(res, null, result.mensaje);
  }),

  reactivate: asyncHandler(async (req, res) => {
    const result = await ActividadService.reactivate(req.params.id);
    return sendSuccess(res, null, result.mensaje);
  }),
};

module.exports = ActividadController;
