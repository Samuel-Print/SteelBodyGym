'use strict';

const bcrypt = require('bcryptjs');
const constants = require('../config/constants');

const hash = async (plainText) => {
  const salt = await bcrypt.genSalt(constants.SALT_ROUNDS || 10);
  return bcrypt.hash(plainText, salt);
};

const compare = (plainText, hashedText) => {
  return bcrypt.compare(plainText, hashedText);
};

module.exports = {
  hash,
  compare,
};
