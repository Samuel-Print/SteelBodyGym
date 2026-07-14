'use strict';

const ClaseService = require('../services/clase.service');
const { sendSuccess, sendCreated } = require('../utils/response');
const asyncHandler = require('../utils/asyncHandler');

const ClaseController = {
  getAll: asyncHandler(async (req, res) => {
    const data = await ClaseService.getAll(req.query);
    return sendSuccess(res, data);
  }),

  getById: asyncHandler(async (req, res) => {
    const clase = await ClaseService.getById(req.params.id);
    return sendSuccess(res, clase);
  }),

  create: asyncHandler(async (req, res) => {
    const clase = await ClaseService.create(req.body);
    return sendCreated(res, clase);
  }),

  update: asyncHandler(async (req, res) => {
    const clase = await ClaseService.update(req.params.id, req.body);
    return sendSuccess(res, clase, 'Clase actualizada correctamente');
  }),

  softDelete: asyncHandler(async (req, res) => {
    const result = await ClaseService.softDelete(req.params.id);
    return sendSuccess(res, null, result.mensaje);
  }),

  reactivate: asyncHandler(async (req, res) => {
    const result = await ClaseService.reactivate(req.params.id);
    return sendSuccess(res, null, result.mensaje);
  }),

  getStats: asyncHandler(async (req, res) => {
    const stats = await ClaseService.getStats();
    return sendSuccess(res, stats);
  }),
};

module.exports = ClaseController;
