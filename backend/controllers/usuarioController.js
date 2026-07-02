const { Usuario } = require('../models');
const bcrypt = require('bcryptjs');  // ← AGREGAR ESTA LÍNEA

const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      where: { activo: true },
      order: [['id_usuario', 'ASC']],
      attributes: { exclude: ['password_hash'] }
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      attributes: { exclude: ['password_hash'] }
    });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUsuario = async (req, res) => {
  try {
    const { nombre, email, password, telefono } = req.body;  
    
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }
    
    // Encriptar la contraseña 
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    
    const usuario = await Usuario.create({
      nombre,
      email,
      password_hash,  // ← Guardar el hash
      telefono,
      activo: true
    });
    
    // No devolver el password_hash 
    const usuarioResponse = usuario.toJSON();
    delete usuarioResponse.password_hash;
    
    res.status(201).json(usuarioResponse);  
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    // Si se envía password, encriptarlo 
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password_hash = await bcrypt.hash(req.body.password, salt);
      delete req.body.password;
    }
    
    await usuario.update(req.body);
    
    // No devolver el password_hash 
    const usuarioResponse = usuario.toJSON();
    delete usuarioResponse.password_hash;
    
    res.json(usuarioResponse);  
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    await usuario.update({ activo: false });
    res.json({ mensaje: 'Usuario desactivado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const reactivarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    await usuario.update({ activo: true });
    res.json({ 
      mensaje: 'Usuario reactivado correctamente',
      usuario: usuario 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  reactivarUsuario
};