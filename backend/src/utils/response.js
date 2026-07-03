'use strict';

const sendSuccess = (res, data = null, message = 'Operación exitosa', statusCode = 200) => {
  const response = {
    success: true,
    message,
    data,
  };
  return res.status(statusCode).json(response);
};

const sendCreated = (res, data = null, message = 'Recurso creado exitosamente') => {
  return sendSuccess(res, data, message, 201);
};

const sendError = (res, message = 'Ha ocurrido un error', statusCode = 500, errorDetails = null) => {
  const response = {
    success: false,
    message,
    error: errorDetails || { code: statusCode },
  };
  return res.status(statusCode).json(response);
};

module.exports = {
  sendSuccess,
  sendCreated,
  sendError,
};
