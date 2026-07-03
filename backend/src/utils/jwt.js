'use strict';

const jwt = require('jsonwebtoken');
const env = require('../config/environment');
const AppError = require('./AppError');
const constants = require('../config/constants');

const generateToken = (payload) => {
  return jwt.sign(payload, env.jwt.secret, {
    expiresIn: env.jwt.expiresIn,
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, env.jwt.secret);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new AppError('Token expirado. Por favor inicia sesión nuevamente.', constants.HTTP.UNAUTHORIZED);
    }
    throw new AppError(constants.MESSAGES.UNAUTHORIZED, constants.HTTP.UNAUTHORIZED);
  }
};

const extractBearerToken = (authHeader) => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError(constants.MESSAGES.UNAUTHORIZED, constants.HTTP.UNAUTHORIZED);
  }
  return authHeader.split(' ')[1];
};

module.exports = {
  generateToken,
  verifyToken,
  extractBearerToken,
};
