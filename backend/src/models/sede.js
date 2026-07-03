'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Sede extends Model {
    static associate(models) {}
  }
  
  Sede.init({
    id_sede: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    direccion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    latitud: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true
    },
    longitud: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true
    },
    horario_atencion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    imagen_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Sede',
    tableName: 'sedes',
    timestamps: false
  });
  
  return Sede;
};