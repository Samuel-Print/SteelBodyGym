'use strict';

/**
 * asyncHandler — Envuelve funciones controladoras asíncronas para interceptar
 * errores y propagarlos automáticamente a `next(error)` sin usar try/catch repetitivos.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
