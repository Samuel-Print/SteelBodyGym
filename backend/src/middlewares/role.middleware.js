'use strict';

const AppError = require('../utils/AppError');
const constants = require('../config/constants');

/**
 * Middleware para autorización de roles.
 * Uso: router.get('/', authenticate, authorize('Administrador', 'Empleado'), controller)
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('No autenticado. Inicie sesión.', constants.HTTP.UNAUTHORIZED));
    }

    const userRole = req.user.rol; // 'Administrador', 'Empleado', 'Cliente'
    if (!allowedRoles.includes(userRole)) {
      return next(new AppError('Acceso denegado. Permisos insuficientes.', constants.HTTP.FORBIDDEN));
    }

    next();
  };
};

module.exports = authorize;
