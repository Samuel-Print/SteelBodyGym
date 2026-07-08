'use strict';

const AuthService = require('../services/auth.service');
const { sendSuccess, sendCreated } = require('../utils/response');
const asyncHandler = require('../utils/asyncHandler');

const AuthController = {
  register: asyncHandler(async (req, res) => {
    const usuario = await AuthService.register(req.body);
    return sendCreated(res, usuario, 'Usuario registrado exitosamente');
  }),

  login: asyncHandler(async (req, res) => {
    const result = await AuthService.login(req.body);
    return sendSuccess(res, result, 'Inicio de sesión exitoso');
  }),
};

module.exports = AuthController;
