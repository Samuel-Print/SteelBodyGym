'use strict';

const AppError = require('../utils/AppError');

/**
 * Middleware catch-all para rutas no existentes.
 * Debe registrarse DESPUÉS de todas las rutas y ANTES del errorHandler.
 */
const notFound = (req, res, next) => {
  next(new AppError(`Ruta no encontrada: ${req.method} ${req.originalUrl}`, 404));
};

module.exports = notFound;
