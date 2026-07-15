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

const uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'Por favor, sube al menos un archivo de imagen válido.' });
    }

    const archivosSubidos = req.files.map(file => ({
      nombre: file.filename,
      url: `/uploads/${file.filename}`,
      size: file.size,
      mimetype: file.mimetype
    }));
    
    return res.status(200).json({
      mensaje: `${req.files.length} archivo(s) subido(s) exitosamente`,
      archivos: archivosSubidos
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error interno al subir los archivos', detalle: error.message });
  }
};

module.exports = {
  uploadImage,
  uploadMultipleImages
};
  