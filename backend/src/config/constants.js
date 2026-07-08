'use strict';

/**
 * Constantes de lógica de negocio del sistema.
 * NUNCA almacenar credenciales aquí — usar environment.js.
 */
const constants = {
  // Seguridad
  SALT_ROUNDS: 10,
  JWT_EXPIRES_IN: '24h',

  // Paginación
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,

  // HTTP Status codes (semántica)
  HTTP: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE: 422,
    INTERNAL: 500,
  },

  // Roles del sistema (preparado para v1.0)
  ROLES: {
    ADMIN: 'admin',
    RECEPCIONISTA: 'recepcionista',
    CLIENTE: 'cliente',
  },

  // Mensajes genéricos reutilizables
  MESSAGES: {
    NOT_FOUND: (entity) => `${entity} no encontrado/a`,
    ALREADY_EXISTS: (field) => `El ${field} ya está registrado`,
    DELETED: (entity) => `${entity} desactivado/a correctamente`,
    REACTIVATED: (entity) => `${entity} reactivado/a correctamente`,
    INVALID_CREDENTIALS: 'Credenciales inválidas',
    UNAUTHORIZED: 'No autorizado. Token inválido o expirado',
    FORBIDDEN: 'Acceso denegado. Permisos insuficientes',
    VALIDATION_ERROR: 'Error de validación',
  },
};

module.exports = constants;
