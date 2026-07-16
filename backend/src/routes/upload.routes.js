const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadController = require('../controllers/upload.controller');
const uploadMiddleware = require('../middlewares/upload.middleware');

// Wrapper para manejar errores de Multer (como límite de tamaño o formato inválido)
const handleUpload = (uploadFn) => {
  return (req, res, next) => {
    uploadFn(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // Error específico de Multer (ej. límite de tamaño excedido)
        return res.status(400).json({ error: 'Error al subir archivo', detalle: err.message });
      } else if (err) {
        // Otros errores (ej. formato no permitido, error lanzado por nuestro fileFilter)
        return res.status(400).json({ error: 'Archivo no permitido', detalle: err.message });
      }
      // Si no hay error, pasamos al controlador
      next();
    });
  };
};

// Ruta para subir una imagen única (campo form-data: 'imagen')
router.post('/imagen', handleUpload(uploadMiddleware.single('imagen')), uploadController.uploadImage);

// Ruta para subir múltiples imágenes (hasta 5 imágenes, campo form-data: 'imagenes')
router.post('/imagenes', handleUpload(uploadMiddleware.array('imagenes', 5)), uploadController.uploadMultipleImages);

module.exports = router;
