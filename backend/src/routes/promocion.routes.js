'use strict';

const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.middleware');
const validate = require('../middlewares/validation.middleware');
const PromocionController = require('../controllers/promocion.controller');
const promocionValidator = require('../validators/promocion.validator');

router.get('/', PromocionController.getAll);

router.get('/vigentes', PromocionController.getVigentes);

router.get('/:id', PromocionController.getById);

router.post('/', authenticate, authorize('Administrador', 'Empleado'), validate(promocionValidator.create), PromocionController.create);

router.put('/:id', authenticate, authorize('Administrador', 'Empleado'), validate(promocionValidator.update), PromocionController.update);

router.patch('/:id/reactivate', authenticate, authorize('Administrador'), PromocionController.reactivate);

router.delete('/:id', authenticate, authorize('Administrador'), PromocionController.softDelete);

module.exports = router;