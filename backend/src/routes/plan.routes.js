'use strict';

const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validation.middleware');
const PlanController = require('../controllers/plan.controller');
const planValidator = require('../validators/plan.validator');

router.get('/', PlanController.getAll);
router.get('/:id', PlanController.getById);

router.post('/', authenticate, validate(planValidator.create), PlanController.create);

router.put('/:id', authenticate, validate(planValidator.update), PlanController.update);

router.patch('/:id/reactivate', authenticate, PlanController.reactivate);

router.delete('/:id', authenticate, PlanController.softDelete);

module.exports = router;