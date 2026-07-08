'use strict';

const UsuarioRepository = require('../repositories/usuario.repository');
const EmailService = require('./email.service');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
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

  solicitarRecuperacion: async (email) => {
    // Buscar usuario
    const usuario = await UsuarioRepository.findByEmail(email);
    if (!usuario) {
      throw new AppError('No existe una cuenta con este email', 404);
    }

    // Generar token
    const token = crypto.randomBytes(32).toString('hex');
    const expiracion = new Date(Date.now() + 3600000); // 1 hora

    // Guardar token
    await UsuarioRepository.saveToken(email, token, expiracion);

    // Enviar email
    if (process.env.NODE_ENV === 'development') {
      await EmailService.sendRecoveryEmailDev(email, token);
    } else {
      await EmailService.sendRecoveryEmail(email, token);
    }

    return { mensaje: 'Se ha enviado un enlace de recuperación a tu correo electrónico' };
  },

  verificarToken: async (token) => {
    const usuario = await UsuarioRepository.findByToken(token);
    if (!usuario) {
      throw new AppError('Token inválido o expirado', 400);
    }
    return { mensaje: 'Token válido', email: usuario.email };
  },

  resetearPassword: async (token, nueva_password) => {
    // Validar contraseña
    if (!nueva_password || nueva_password.length < 6) {
      throw new AppError('La contraseña debe tener al menos 6 caracteres', 400);
    }

    // Verificar token
    const usuario = await UsuarioRepository.findByToken(token);
    if (!usuario) {
      throw new AppError('Token inválido o expirado', 400);
    }

    // Encriptar nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(nueva_password, salt);

    // Actualizar contraseña y limpiar token
    await UsuarioRepository.updatePassword(usuario.id_usuario, password_hash);

    return { mensaje: 'Contraseña actualizada correctamente' };
  }
};

module.exports = UsuarioService;
