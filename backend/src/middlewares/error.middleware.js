'use strict';

const AppError = require('../utils/AppError');
const { sendError } = require('../utils/response');
const logger = require('../utils/logger');
const env = require('../config/environment');

/**
 * Convierte errores conocidos de Sequelize a AppError con mensajes claros.
 */

const handleSequelizeError = (err) => {
  if (err.name === 'SequelizeUniqueConstraintError') {
    const field = err.errors[0]?.path || 'campo';
    return new AppError(`El ${field} ya está registrado`, 409);
  }
  if (err.name === 'SequelizeValidationError') {
    const message = err.errors.map((e) => e.message).join(', ');
    return new AppError(message, 422);
  }
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return new AppError('Referencia a un registro inexistente', 400);
  }
  return null;
};

/**
 * Middleware global de manejo de errores.
 * Debe ser el ÚLTIMO middleware registrado en app.js.
 * Recibe errores propagados con next(error) desde controladores/servicios.
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.log(err.name);
  console.log(err.message);
  console.log(err.parent);
  console.log(err.original);
  console.log(err.sql);
  
  // Intentar convertir errores Sequelize a AppError
  const sequelizeErr = handleSequelizeError(err);
  if (sequelizeErr) return errorHandler(sequelizeErr, req, res, next);

  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Error interno del servidor';

  // Loggear el error siempre
  logger.error(`${req.method} ${req.originalUrl} → ${statusCode}: ${err.message}`, {
    stack: env.isDevelopment ? err.stack : undefined,
  });

  return sendError(
    res,
    message,
    statusCode,
    env.isDevelopment && !err.isOperational ? { stack: err.stack } : undefined
  );
};

module.exports = errorHandler;
