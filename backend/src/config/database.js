'use strict';

const { Sequelize } = require('sequelize');
const env = require('./environment');

const sequelize = new Sequelize(env.db.name, env.db.user, env.db.password, {
  host: env.db.host,
  port: env.db.port,
  dialect: 'postgres',
  logging: env.isDevelopment ? (msg) => require('./environment') && console.log(`[SQL] ${msg}`) : false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    underscored: false,
    freezeTableName: true,
  },
});

module.exports = sequelize;
