'use strict';

const { Usuario } = require('../models');
const { Op } = require('sequelize');

const SAFE_ATTRS = { exclude: ['password_hash', 'token_recuperacion'] };

const UsuarioRepository = {
  findAndCount: (options) => {
    return Usuario.findAndCountAll({
      where: options.where,
      limit: options.limit,
      offset: options.offset,
      order: options.order,
      attributes: SAFE_ATTRS,
    });
  },

  findAll: () => {
    return Usuario.findAll({
      order: [['id_usuario', 'ASC']],
      attributes: SAFE_ATTRS,
    });
  },

  findById: (id) => {
    return Usuario.findByPk(id, { attributes: SAFE_ATTRS });
  },

  findByIdWithPassword: (id) => {
    return Usuario.findByPk(id);
  },

  findByEmail: (email) => {
    return Usuario.findOne({ where: { email } });
  },

  create: (data) => {
    return Usuario.create(data);
  },

  update: async (id, data) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return null;
    await usuario.update(data);
    const updated = usuario.toJSON();
    delete updated.password_hash;
    return updated;
  },

  softDelete: async (id) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return null;
    return usuario.update({ activo: false });
  },

  reactivate: async (id) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return null;
    return usuario.update({ activo: true });
  },

  updateLastAccess: (id) => {
    return Usuario.update({ ultimo_acceso: new Date() }, { where: { id_usuario: id } });
  },

  findByEmail: (email) => {
    return Usuario.findOne({ where: { email } });
  },

  findByToken: (token) => {
    return Usuario.findOne({
      where: {
        token_recuperacion: token,
        token_expira: { [Op.gt]: new Date() },
        activo: true
      }
    });
  },

  findByTokenRaw: (token) => {
    return Usuario.findOne({
      where: {
        token_recuperacion: token,
        token_expira: { [Op.gt]: new Date() },
        activo: true
      }
    });
  },

  saveToken: async (email, token, expiracion) => {
    return Usuario.update(
      { token_recuperacion: token, token_expira: expiracion },
      { where: { email } }
    );
  },

  clearToken: async (id) => {
    return Usuario.update(
      { token_recuperacion: null, token_expira: null },
      { where: { id_usuario: id } }
    );
  },

  updatePassword: async (id, password_hash) => {
    return Usuario.update(
      { password_hash, token_recuperacion: null, token_expira: null },
      { where: { id_usuario: id } }
    );
  },

  countTotal: () => {
    return Usuario.count();
  },

  countActivos: () => {
    return Usuario.count({ where: { activo: true } });
  },

  countInactivos: () => {
    return Usuario.count({ where: { activo: false } });
  }
};

module.exports = UsuarioRepository;
