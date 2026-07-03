'use strict';

const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.middleware');
const validate = require('../middlewares/validation.middleware');
const PlanController = require('../controllers/plan.controller');
const planValidator = require('../validators/plan.validator');

router.get('/', PlanController.getAll);
router.get('/:id', PlanController.getById);

router.post('/', authenticate, authorize('Administrador', 'Empleado'), validate(planValidator.create), PlanController.create);

router.put('/:id', authenticate, authorize('Administrador', 'Empleado'), validate(planValidator.update), PlanController.update);

router.patch('/:id/reactivate', authenticate, authorize('Administrador'), PlanController.reactivate);

router.delete('/:id', authenticate, authorize('Administrador'), PlanController.softDelete);

module.exports = router;