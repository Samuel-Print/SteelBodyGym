'use strict';

const { sendError } = require('../utils/response');
const constants = require('../config/constants');

/**
 * Middleware ejecutor de validadores.
 * Uso: router.post('/', validate(sedeValidator.create), controller)
 */
const validate = (validatorFn) => (req, res, next) => {
  const errors = validatorFn(req);
  if (errors && errors.length > 0) {
    return sendError(
      res,
      constants.MESSAGES.VALIDATION_ERROR,
      constants.HTTP.UNPROCESSABLE,
      errors
    );
  }
  next();
};

module.exports = validate;
