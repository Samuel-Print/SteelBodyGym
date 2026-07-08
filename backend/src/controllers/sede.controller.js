'use strict';

const SedeService = require('../services/sede.service');
const { sendSuccess, sendCreated } = require('../utils/response');
const asyncHandler = require('../utils/asyncHandler');

const SedeController = {
  getAll: asyncHandler(async (req, res) => {
    const data = await SedeService.getAll(req.query);
    return sendSuccess(res, data);
  }),

  getById: asyncHandler(async (req, res) => {
    const sede = await SedeService.getById(req.params.id);
    return sendSuccess(res, sede);
  }),

  create: asyncHandler(async (req, res) => {
    const sede = await SedeService.create(req.body);
    return sendCreated(res, sede);
  }),

  update: asyncHandler(async (req, res) => {
    const sede = await SedeService.update(req.params.id, req.body);
    return sendSuccess(res, sede, 'Sede actualizada correctamente');
  }),

  softDelete: asyncHandler(async (req, res) => {
    const result = await SedeService.softDelete(req.params.id);
    return sendSuccess(res, null, result.mensaje);
  }),

  reactivate: asyncHandler(async (req, res) => {
    const result = await SedeService.reactivate(req.params.id);
    return sendSuccess(res, null, result.mensaje);
  }),
};

module.exports = SedeController;
