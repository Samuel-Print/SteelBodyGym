'use strict';

const express = require('express');
const router = express.Router();
const SedeController = require('../controllers/sede.controller');
const authenticate = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validation.middleware');
const sedeValidator = require('../validators/sede.validator');

router.get('/', SedeController.getAll);
router.get('/:id', SedeController.getById);

// Rutas protegidas
router.post(
  '/',
  authenticate,
  validate(sedeValidator.create),
  SedeController.create
);
router.put(
  '/:id',
  authenticate,
  validate(sedeValidator.update),
  SedeController.update
);
router.delete('/:id', authenticate, SedeController.softDelete);
router.put('/:id/reactivar', authenticate, SedeController.reactivate);

module.exports = router;
