'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    static associate(models) {}
  }
  
  Plan.init({
    id_plan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    tiempo_meses: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: true
    },
    costo: {
      type: DataTypes.DECIMAL(10, 2),
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
    destacado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    orden_display: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Plan',
    tableName: 'planes',
    timestamps: false
  });
  
  return Plan;
};