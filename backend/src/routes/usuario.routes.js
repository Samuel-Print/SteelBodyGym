'use strict';

const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuario.controller');
const authenticate = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.middleware');
const validate = require('../middlewares/validation.middleware');
const usuarioValidator = require('../validators/usuario.validator');

// Rutas de administración de usuarios
router.get('/', authenticate, authorize('Administrador', 'Empleado'), UsuarioController.getAll);
router.get('/:id', authenticate, authorize('Administrador', 'Empleado'), UsuarioController.getById);

router.post(
  '/',
  authenticate,
  authorize('Administrador'),
  validate(usuarioValidator.create),
  UsuarioController.create
);
router.put(
  '/:id',
  authenticate,
  authorize('Administrador'),
  validate(usuarioValidator.update),
  UsuarioController.update
);
router.delete('/:id', authenticate, authorize('Administrador'), UsuarioController.softDelete);
router.put('/:id/reactivar', authenticate, authorize('Administrador'), UsuarioController.reactivate);

module.exports = router;
