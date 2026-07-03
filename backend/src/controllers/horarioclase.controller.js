'use strict';

const HorarioClaseService = require('../services/horarioclase.service');
const { sendSuccess, sendCreated } = require('../utils/response');
const asyncHandler = require('../utils/asyncHandler');

const HorarioClaseController = {
  getAll: asyncHandler(async (req, res) => {
    const data = await HorarioClaseService.getAll(req.query);
    return sendSuccess(res, data);
  }),

  getById: asyncHandler(async (req, res) => {
    const horario = await HorarioClaseService.getById(req.params.id);
    return sendSuccess(res, horario);
  }),

  getByClase: asyncHandler(async (req, res) => {
    const horarios = await HorarioClaseService.getByClase(req.params.id_clase);
    return sendSuccess(res, horarios);
  }),

  create: asyncHandler(async (req, res) => {
    const horario = await HorarioClaseService.create(req.body);
    return sendCreated(res, horario);
  }),

  update: asyncHandler(async (req, res) => {
    const horario = await HorarioClaseService.update(req.params.id, req.body);
    return sendSuccess(res, horario, 'Horario actualizado correctamente');
  }),

  softDelete: asyncHandler(async (req, res) => {
    const result = await HorarioClaseService.softDelete(req.params.id);
    return sendSuccess(res, null, result.mensaje);
  }),

  reactivate: asyncHandler(async (req, res) => {
    const result = await HorarioClaseService.reactivate(req.params.id);
    return sendSuccess(res, null, result.mensaje);
  }),
};

module.exports = HorarioClaseController;
