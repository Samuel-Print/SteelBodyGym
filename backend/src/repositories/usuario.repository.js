'use strict';

const { Usuario } = require('../models');

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
      where: { activo: true },
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
};

module.exports = UsuarioRepository;
