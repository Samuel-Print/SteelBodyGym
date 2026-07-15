const express = require('express');
const cors = require('cors');

// Importar rutas
const authRoutes = require('./routes/auth.routes');
const sedeRoutes = require('./routes/sede.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const claseRoutes = require('./routes/clase.routes');
const horarioclaseRoutes = require('./routes/horarioclase.routes');
const planRoutes = require('./routes/plan.routes');
const promocionRoutes = require('./routes/promocion.routes');
const uploadRoutes = require('./routes/upload.routes');
const actividadRoutes = require('./routes/actividad.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Hacer pública la carpeta de uploads para acceder a los archivos vía URL
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API Steel Body Gym',
    endpoints: {
      sedes: '/api/sedes',
      usuarios: '/api/usuarios',
      clases: '/api/clases',
      horarioclases: '/api/horarioclases',
      planes: '/api/planes',
      promociones: '/api/promociones',
      auth: '/api/auth',
    }
  });
});

// Registrar rutas
app.use('/api/sedes', sedeRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/clases', claseRoutes);
app.use('/api/horarioclases', horarioclaseRoutes);
app.use('/api/planes', planRoutes);
app.use('/api/promociones', promocionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/actividades', actividadRoutes);

module.exports = app;
