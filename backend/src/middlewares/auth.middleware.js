'use strict';

const { verifyToken, extractBearerToken } = require('../utils/jwt');
const AppError = require('../utils/AppError');
const constants = require('../config/constants');

/**
 * Middleware de autenticación JWT.
 * Verifica que el request incluya un Bearer Token válido.
 * Inyecta req.user con el payload decodificado.
 */
const authenticate = (req, res, next) => {
  try {
    const token = extractBearerToken(req.headers.authorization);
    const decoded = verifyToken(token);
    req.user = decoded; // { id, email, rol, ... }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate;
