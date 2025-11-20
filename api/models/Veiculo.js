const { DataTypes } = require('sequelize');
const db = require('../db');
const Empresa = require('./Empresa');

const Veiculo = db.define('Veiculo', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  modelo: { type: DataTypes.STRING, allowNull: false },
  placa: { type: DataTypes.STRING, allowNull: false },
  empresa_id: { type: DataTypes.INTEGER, allowNull: false }
});

Veiculo.belongsTo(Empresa, { foreignKey: 'empresa_id' });

module.exports = Veiculo;