const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');
const { upload, handleUpload } = require('../middlewares/upload.middleware');

// Ruta para subir una imagen única (campo form-data: 'imagen')
router.post('/imagen', handleUpload(upload.single('imagen')), uploadController.uploadImage);

// Ruta para subir múltiples imágenes (hasta 5, campo form-data: 'imagenes')
router.post('/imagenes', handleUpload(upload.array('imagenes', 5)), uploadController.uploadMultipleImages);

module.exports = router;
