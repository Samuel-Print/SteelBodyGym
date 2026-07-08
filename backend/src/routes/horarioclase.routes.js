'use strict';

const express = require('express');
const router = express.Router();
const HorarioClaseController = require('../controllers/horarioclase.controller');
const authenticate = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validation.middleware');
const horarioclaseValidator = require('../validators/horarioclase.validator');

router.get('/', HorarioClaseController.getAll);
router.get('/:id', HorarioClaseController.getById);

// Rutas protegidas
router.post(
  '/',
  authenticate,
  validate(horarioclaseValidator.create),
  HorarioClaseController.create
);
router.put(
  '/:id',
  authenticate,
  validate(horarioclaseValidator.update),
  HorarioClaseController.update
);
router.delete('/:id', authenticate, HorarioClaseController.softDelete);
router.put('/:id/reactivar', authenticate, HorarioClaseController.reactivate);

module.exports = router;
