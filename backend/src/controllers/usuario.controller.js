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

  solicitarRecuperacion: asyncHandler(async (req, res) => {
    const { email } = req.body;
    const result = await UsuarioService.solicitarRecuperacion(email);
    return sendSuccess(res, null, result.mensaje);
  }),

  verificarToken: asyncHandler(async (req, res) => {
    const { token } = req.params;
    const result = await UsuarioService.verificarToken(token);
    return sendSuccess(res, result);
  }),

  resetearPassword: asyncHandler(async (req, res) => {
    const { token, nueva_password } = req.body;
    const result = await UsuarioService.resetearPassword(token, nueva_password);
    return sendSuccess(res, null, result.mensaje);
  })

};

module.exports = UsuarioController;
