const { DataTypes } = require('sequelize');
const db = require('../db');

const Empresa = db.define('Empresa', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  cnpj: { type: DataTypes.STRING, allowNull: false },
  endereco: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Empresa;