const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

// Importar tus rutas
const sedeRoutes = require('./routes/sedeRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API Steel Body Gym',
    endpoints: {
      sedes: '/api/sedes',
      usuarios: '/api/usuarios'
    }
  });
});

// ============================================
// REGISTRAR TUS RUTAS
// ============================================
app.use('/api/sedes', sedeRoutes);
app.use('/api/usuarios', usuarioRoutes);

// ============================================
// INICIAR SERVIDOR
// ============================================
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado a PostgreSQL');
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
});