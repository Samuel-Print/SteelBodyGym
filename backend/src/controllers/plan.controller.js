'use strict';

const PlanService = require('../services/plan.service');
const { sendSuccess, sendCreated } = require('../utils/response');
const asyncHandler = require('../utils/asyncHandler');

const PlanController = {
  getAll: asyncHandler(async (req, res) => {
    const data = await PlanService.getAll(req.query);
    return sendSuccess(res, data);
  }),

  getById: asyncHandler(async (req, res) => {
    const plan = await PlanService.getById(req.params.id);
    return sendSuccess(res, plan);
  }),

  create: asyncHandler(async (req, res) => {
    const plan = await PlanService.create(req.body);
    return sendCreated(res, plan);
  }),

  update: asyncHandler(async (req, res) => {
    const plan = await PlanService.update(req.params.id, req.body);
    return sendSuccess(res, plan, 'Plan actualizado correctamente');
  }),

  softDelete: asyncHandler(async (req, res) => {
    const result = await PlanService.softDelete(req.params.id);
    return sendSuccess(res, null, result.mensaje);
  }),

  reactivate: asyncHandler(async (req, res) => {
    const result = await PlanService.reactivate(req.params.id);
    return sendSuccess(res, null, result.mensaje);
  }),

  getStats: asyncHandler(async (req, res) => {
    const stats = await PlanService.getStats();
    return sendSuccess(res, stats);
  }),
};

module.exports = PlanController;
