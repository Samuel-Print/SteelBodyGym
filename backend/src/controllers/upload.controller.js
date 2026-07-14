const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Por favor, sube un archivo de imagen válido.' });
    }

    // URL pública para acceder a la imagen
    const fileUrl = `/uploads/${req.file.filename}`;
    
    return res.status(200).json({
      mensaje: 'Archivo subido exitosamente',
      archivo: {
        nombre: req.file.filename,
        url: fileUrl,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error interno al subir el archivo', detalle: error.message });
  }
};

module.exports = {
  uploadImage
};
