'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class HorarioClase extends Model {
    static associate(models) {
      HorarioClase.belongsTo(models.Clase, {
        foreignKey: 'id_clase',
        as: 'clase'
      });
    }
  }
  
  HorarioClase.init({
    id_horario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_clase: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'clases',
        key: 'id_clase'
      }
    },
    dia_semana: {
      type: DataTypes.ENUM('Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'),
      allowNull: false
    },
    hora_inicio: {
      type: DataTypes.TIME,
      allowNull: false
    },
    hora_fin: {
      type: DataTypes.TIME,
      allowNull: false
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'HorarioClase',
    tableName: 'horarios_clases',
    timestamps: false
  });
  
  return HorarioClase;
};