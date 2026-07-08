'use strict';

const express = require('express');
const router = express.Router();
const SedeController = require('../controllers/sede.controller');
const authenticate = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.middleware');
const validate = require('../middlewares/validation.middleware');
const sedeValidator = require('../validators/sede.validator');

router.get('/', SedeController.getAll);
router.get('/:id', SedeController.getById);

// Rutas protegidas
router.post(
  '/',
  authenticate,
  authorize('Administrador', 'Empleado'),
  validate(sedeValidator.create),
  SedeController.create
);
router.put(
  '/:id',
  authenticate,
  authorize('Administrador', 'Empleado'),
  validate(sedeValidator.update),
  SedeController.update
);
router.delete('/:id', authenticate, authorize('Administrador'), SedeController.softDelete);
router.put('/:id/reactivar', authenticate, authorize('Administrador'), SedeController.reactivate);

module.exports = router;
