'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Clase extends Model {
    static associate(models) {
      Clase.hasMany(models.HorarioClase, {
        foreignKey: 'id_clase',
        as: 'horarios'
      });
    }
  }
  
  Clase.init({
    id_clase: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(100),
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
    modelName: 'Clase',
    tableName: 'clases',
    timestamps: false
  });
  
  return Clase;
};