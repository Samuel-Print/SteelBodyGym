const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');
const uploadMiddleware = require('../middlewares/upload.middleware');

// Ruta para subir una imagen única
// El campo en el form-data debe llamarse 'imagen'
router.post('/imagen', uploadMiddleware.single('imagen'), uploadController.uploadImage);

module.exports = router;
