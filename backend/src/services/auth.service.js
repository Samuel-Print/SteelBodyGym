'use strict';

const UsuarioRepository = require('../repositories/usuario.repository');
const { hash: hashPassword, compare } = require('../utils/bcrypt');
const { generateToken } = require('../utils/jwt');
const AppError = require('../utils/AppError');
const constants = require('../config/constants');

const AuthService = {
  /**
   * Registra un nuevo usuario en el sistema.
   * Valida duplicado de email, encripta contraseña y retorna el usuario creado sin datos sensibles.
   */
  register: async ({ nombre, email, password, telefono }) => {
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
      activo: true,
    });

    const data = usuario.toJSON();
    delete data.password_hash;
    delete data.token_recuperacion;
    return data;
  },

  /**
   * Autentica al usuario con email y contraseña.
   * Retorna un JWT y datos básicos del usuario.
   */
  login: async ({ email, password }) => {
    const usuario = await UsuarioRepository.findByEmail(email);
    if (!usuario || !usuario.activo) {
      throw new AppError(constants.MESSAGES.INVALID_CREDENTIALS, constants.HTTP.UNAUTHORIZED);
    }

    const isMatch = await compare(password, usuario.password_hash);
    if (!isMatch) {
      throw new AppError(constants.MESSAGES.INVALID_CREDENTIALS, constants.HTTP.UNAUTHORIZED);
    }

    await UsuarioRepository.updateLastAccess(usuario.id_usuario);

    const token = generateToken({
      id: usuario.id_usuario,
      email: usuario.email,
      nombre: usuario.nombre,
    });

    return {
      token,
      usuario: {
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        email: usuario.email,
      },
    };
  },
};

module.exports = AuthService;
