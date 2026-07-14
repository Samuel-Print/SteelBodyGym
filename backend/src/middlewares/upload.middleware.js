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
    cb(null, uploadDir); // Ruta donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    // Generar un nombre único para evitar sobreescribir archivos
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// Filtro de archivos (opcional: solo permitir imágenes por ejemplo)
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Error: Solo se permiten imágenes (jpeg, jpg, png, gif)!'));
  }
};

// Configurar multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // Límite de 5 MB
  },
  fileFilter: fileFilter
});

module.exports = upload;
