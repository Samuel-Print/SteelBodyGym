const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Crear la carpeta de subidas si no existe
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// Filtro de archivos: solo imágenes
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Error: Solo se permiten imágenes (jpeg, jpg, png, gif, webp)!'));
  }
};

// Instancia de multer configurada
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // Límite de 5 MB
  },
  fileFilter: fileFilter
});

/**
 * Wrapper que maneja errores de Multer y los convierte en respuestas JSON limpias.
 * Uso: handleUpload(upload.single('imagen'))
 */
const handleUpload = (uploadFn) => {
  return (req, res, next) => {
    uploadFn(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'Error al subir archivo', detalle: err.message });
      } else if (err) {
        return res.status(400).json({ error: 'Archivo no permitido', detalle: err.message });
      }
      next();
    });
  };
};

/**
 * Middleware que inyecta la URL de la imagen subida en req.body.imagen_url.
 * Si no se subió imagen, simplemente pasa al siguiente middleware.
 * Debe usarse DESPUÉS de handleUpload.
 */
const injectImageUrl = (req, res, next) => {
  if (req.file) {
    req.body.imagen_url = `/uploads/${req.file.filename}`;
  }
  next();
};

module.exports = {
  upload,
  handleUpload,
  injectImageUrl
};
