const { DataTypes } = require('sequelize');
const db = require('../db');
const Empresa = require('./Empresa');

class Veiculo {
    constructor(modelo, placa, empresa_id) {
        this.modelo = modelo;
        this.placa = placa;
        this.empresa_id = empresa_id;
    }

    static initModel() {
        const model = db.define('Veiculo', {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            modelo: { type: DataTypes.STRING, allowNull: false },
            placa: { type: DataTypes.STRING, allowNull: false },
            empresa_id: { type: DataTypes.INTEGER, allowNull: false }
        });

        model.belongsTo(Empresa.getModel(), { foreignKey: 'empresa_id' });
        return model;
    }

    static getModel() {
        return this.model || (this.model = this.initModel());
    }

    static async findAll() {
        return await this.getModel().findAll();
    }

    static async create(data) {
        return await this.getModel().create(data);
    }
}

module.exports = Veiculo;