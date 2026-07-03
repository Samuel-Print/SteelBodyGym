'use strict';

const PromocionService = require('../services/promocion.service');
const { sendSuccess, sendCreated } = require('../utils/response');
const asyncHandler = require('../utils/asyncHandler');

const PromocionController = {
  getAll: asyncHandler(async (req, res) => {
    const data = await PromocionService.getAll(req.query);
    return sendSuccess(res, data);
  }),

  getVigentes: asyncHandler(async (req, res) => {
    const promociones = await PromocionService.getVigentes();
    return sendSuccess(res, promociones);
  }),

  getById: asyncHandler(async (req, res) => {
    const promocion = await PromocionService.getById(req.params.id);
    return sendSuccess(res, promocion);
  }),

  create: asyncHandler(async (req, res) => {
    const promocion = await PromocionService.create(req.body);
    return sendCreated(res, promocion);
  }),

  update: asyncHandler(async (req, res) => {
    const promocion = await PromocionService.update(req.params.id, req.body);
    return sendSuccess(res, promocion, 'Promoción actualizada correctamente');
  }),

  softDelete: asyncHandler(async (req, res) => {
    const result = await PromocionService.softDelete(req.params.id);
    return sendSuccess(res, null, result.mensaje);
  }),

  reactivate: asyncHandler(async (req, res) => {
    const result = await PromocionService.reactivate(req.params.id);
    return sendSuccess(res, null, result.mensaje);
  }),
};

module.exports = PromocionController;
