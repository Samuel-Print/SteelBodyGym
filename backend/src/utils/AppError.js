'use strict';

/**
 * AppError — Clase de error personalizada del sistema.
 * Permite distinguir errores operacionales (esperados) de bugs (inesperados).
 */
class AppError extends Error {
  /**
   * @param {string} message  - Mensaje legible por humanos
   * @param {number} statusCode - Código HTTP asociado (400, 404, 401, etc.)
   * @param {boolean} isOperational - true = error esperado del negocio
   */
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
