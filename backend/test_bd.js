// test.js - Solo para probar la conexión a PostgreSQL
const { Sequelize } = require('sequelize');

// Configuración directa (sin archivos externos)
const sequelize = new Sequelize('postgres', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  logging: console.log // Esto mostrará las consultas SQL en consola
});

async function testConnection() {
  try {
    // Intentar conectar
    await sequelize.authenticate();
    console.log('Conexion exitosa a PostgreSQL');
    
    // Probar consulta simple
    const [results] = await sequelize.query('SELECT NOW() as fecha_hora, version() as version_postgres');
    console.log('\nFecha y hora del servidor:', results[0].fecha_hora);
    console.log('Versión de PostgreSQL:', results[0].version_postgres);
    
    console.log('\n¡Todo funciona correctamente!');
    
  } catch (error) {
    console.error('Error de conexión:');
    console.error('Detalle:', error.message);
  } finally {
    await sequelize.close();
  }
}

// Ejecutar la prueba
testConnection();