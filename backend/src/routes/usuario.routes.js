'use strict';

const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuario.controller');
const authenticate = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validation.middleware');
const usuarioValidator = require('../validators/usuario.validator');

// Rutas de administración de usuarios
router.get('/', authenticate, UsuarioController.getAll);
router.get('/stats', authenticate, UsuarioController.getStats);
router.get('/:id', authenticate, UsuarioController.getById);

router.post(
  '/',
  authenticate,
  validate(usuarioValidator.create),
  UsuarioController.create
);
router.put(
  '/:id',
  authenticate,
  validate(usuarioValidator.update),
  UsuarioController.update
);
router.delete('/:id', authenticate, UsuarioController.softDelete);
router.put('/:id/reactivar', authenticate, UsuarioController.reactivate);
router.post('/solicitar-recuperacion', UsuarioController.solicitarRecuperacion);
router.get('/verificar-token/:token', UsuarioController.verificarToken);
router.put('/resetear-password', UsuarioController.resetearPassword);

module.exports = router;
