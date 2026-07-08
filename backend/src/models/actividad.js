'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Actividad extends Model {
    static associate(models) {
      // Si quieres relacionar con Sede, descomenta:
      // Actividad.belongsTo(models.Sede, { foreignKey: 'sede_id', as: 'sede' });
    }
  }
  
  Actividad.init({
    id_actividad: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    sede: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    horario: {
      type: DataTypes.DATE,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imagen_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Actividad',
    tableName: 'actividades',
    timestamps: false
  });
  
  return Actividad;
};