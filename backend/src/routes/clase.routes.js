'use strict';

const express = require('express');
const router = express.Router();
const ClaseController = require('../controllers/clase.controller');
const HorarioClaseController = require('../controllers/horarioclase.controller');
const authenticate = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.middleware');
const validate = require('../middlewares/validation.middleware');
const claseValidator = require('../validators/clase.validator');

router.get('/', ClaseController.getAll);
router.get('/:id', ClaseController.getById);
router.get('/:id_clase/horarios', HorarioClaseController.getByClase);

// Rutas protegidas
router.post(
  '/',
  authenticate,
  authorize('Administrador', 'Empleado'),
  validate(claseValidator.create),
  ClaseController.create
);
router.put(
  '/:id',
  authenticate,
  authorize('Administrador', 'Empleado'),
  validate(claseValidator.update),
  ClaseController.update
);
router.delete('/:id', authenticate, authorize('Administrador'), ClaseController.softDelete);
router.put('/:id/reactivar', authenticate, authorize('Administrador'), ClaseController.reactivate);

module.exports = router;
