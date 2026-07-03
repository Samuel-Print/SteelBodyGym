'use strict';

const UsuarioRepository = require('../repositories/usuario.repository');
const { hash: hashPassword } = require('../utils/bcrypt');
const AppError = require('../utils/AppError');
const constants = require('../config/constants');
const { getPagination, getPagingData } = require('../utils/pagination');
const { Op } = require('sequelize');

const UsuarioService = {
  getAll: async (query) => {
    const { limit, offset, order, page } = getPagination(query);
    const where = { activo: true };

    if (query.search) {
      where[Op.or] = [
        { nombre: { [Op.iLike]: `%${query.search}%` } },
        { email: { [Op.iLike]: `%${query.search}%` } },
      ];
    }

    if (query.rol) {
      where.rol = query.rol;
    }

    const data = await UsuarioRepository.findAndCount({ where, limit, offset, order });
    return getPagingData(data, page, limit);
  },

  getById: async (id) => {
    const usuario = await UsuarioRepository.findById(id);
    if (!usuario) throw new AppError(constants.MESSAGES.NOT_FOUND('Usuario'), constants.HTTP.NOT_FOUND);
    return usuario;
  },

  create: async ({ nombre, email, password, telefono, rol }) => {
    const existe = await UsuarioRepository.findByEmail(email);
    if (existe) {
      throw new AppError(constants.MESSAGES.ALREADY_EXISTS('email'), constants.HTTP.CONFLICT);
    }
    const password_hash = await hashPassword(password);
    const usuario = await UsuarioRepository.create({
      nombre,
      email,
      password_hash,
      telefono,
      rol: rol || 'Cliente',
      activo: true,
    });
    const data = usuario.toJSON();
    delete data.password_hash;
    delete data.token_recuperacion;
    return data;
  },

  update: async (id, body) => {
    const data = { ...body };
    if (data.password) {
      data.password_hash = await hashPassword(data.password);
      delete data.password;
    }
    const result = await UsuarioRepository.update(id, data);
    if (!result) throw new AppError(constants.MESSAGES.NOT_FOUND('Usuario'), constants.HTTP.NOT_FOUND);
    return result;
  },

  softDelete: async (id) => {
    const result = await UsuarioRepository.softDelete(id);
    if (!result) throw new AppError(constants.MESSAGES.NOT_FOUND('Usuario'), constants.HTTP.NOT_FOUND);
    return { mensaje: constants.MESSAGES.DELETED('Usuario') };
  },

  reactivate: async (id) => {
    const result = await UsuarioRepository.reactivate(id);
    if (!result) throw new AppError(constants.MESSAGES.NOT_FOUND('Usuario'), constants.HTTP.NOT_FOUND);
    return { mensaje: constants.MESSAGES.REACTIVATED('Usuario'), usuario: result };
  },
};

module.exports = UsuarioService;
