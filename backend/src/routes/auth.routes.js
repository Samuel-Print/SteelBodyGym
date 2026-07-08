'use strict';

const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const validate = require('../middlewares/validation.middleware');
const authValidator = require('../validators/auth.validator');

router.post('/register', validate(authValidator.register), AuthController.register);
router.post('/login', validate(authValidator.login), AuthController.login);

module.exports = router;
