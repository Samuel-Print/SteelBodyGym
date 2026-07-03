'use strict';

const UsuarioService = require('../services/usuario.service');
const { sendSuccess, sendCreated } = require('../utils/response');
const asyncHandler = require('../utils/asyncHandler');

const UsuarioController = {
  getAll: asyncHandler(async (req, res) => {
    const data = await UsuarioService.getAll(req.query);
    return sendSuccess(res, data);
  }),

  getById: asyncHandler(async (req, res) => {
    const usuario = await UsuarioService.getById(req.params.id);
    return sendSuccess(res, usuario);
  }),

  create: asyncHandler(async (req, res) => {
    const usuario = await UsuarioService.create(req.body);
    return sendCreated(res, usuario);
  }),

  update: asyncHandler(async (req, res) => {
    const usuario = await UsuarioService.update(req.params.id, req.body);
    return sendSuccess(res, usuario, 'Usuario actualizado correctamente');
  }),

  softDelete: asyncHandler(async (req, res) => {
    const result = await UsuarioService.softDelete(req.params.id);
    return sendSuccess(res, null, result.mensaje);
  }),

  reactivate: asyncHandler(async (req, res) => {
    const result = await UsuarioService.reactivate(req.params.id);
    return sendSuccess(res, null, result.mensaje);
  }),
};

module.exports = UsuarioController;
