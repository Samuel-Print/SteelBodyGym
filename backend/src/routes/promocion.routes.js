'use strict';

const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validation.middleware');
const PromocionController = require('../controllers/promocion.controller');
const promocionValidator = require('../validators/promocion.validator');
const { upload, handleUpload, injectImageUrl } = require('../middlewares/upload.middleware');

router.get('/', PromocionController.getAll);

router.get('/vigentes', PromocionController.getVigentes);

router.get('/stats', authenticate, PromocionController.getStats);

router.get('/:id', PromocionController.getById);

router.post(
  '/',
  authenticate,
  handleUpload(upload.single('imagen')),
  injectImageUrl,
  validate(promocionValidator.create),
  PromocionController.create
);

router.put(
  '/:id',
  authenticate,
  handleUpload(upload.single('imagen')),
  injectImageUrl,
  validate(promocionValidator.update),
  PromocionController.update
);

router.patch('/:id/reactivate', authenticate, PromocionController.reactivate);

router.delete('/:id', authenticate, PromocionController.softDelete);

module.exports = router;