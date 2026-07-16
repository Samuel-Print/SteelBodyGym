'use strict';

const express = require('express');
const router = express.Router();
const ActividadController = require('../controllers/actividad.controller');
const authenticate = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validation.middleware');
const actividadValidator = require('../validators/actividad.validator');
const { upload, handleUpload, injectImageUrl } = require('../middlewares/upload.middleware');

router.get('/', ActividadController.getAll);
router.get('/:id', ActividadController.getById);

// Rutas protegidas
router.post(
  '/',
  authenticate,
  handleUpload(upload.single('imagen')),
  injectImageUrl,
  validate(actividadValidator.create),
  ActividadController.create
);
router.put(
  '/:id',
  authenticate,
  handleUpload(upload.single('imagen')),
  injectImageUrl,
  validate(actividadValidator.update),
  ActividadController.update
);
router.delete('/:id', authenticate, ActividadController.softDelete);
router.put('/:id/reactivar', authenticate, ActividadController.reactivate);

module.exports = router;
