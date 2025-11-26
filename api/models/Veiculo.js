const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

class Veiculo {
    constructor(marca, modelo, ano, placa, proprietario_id) {
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.placa = placa;
        this.proprietario_id = proprietario_id;
    }

    static initModel() {
        return sequelize.define('Veiculo', {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            marca: { type: DataTypes.STRING, allowNull: false },
            modelo: { type: DataTypes.STRING, allowNull: false },
            ano: { type: DataTypes.INTEGER, allowNull: false },
            placa: { type: DataTypes.STRING, allowNull: false, unique: true },
            quilometragem: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
            proprietario_id: { type: DataTypes.INTEGER, allowNull: false }
        }, {
            tableName: 'veiculos',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        });
    }

    static getModel() {
        return this.model || (this.model = this.initModel());
    }

    static async findAll(options = {}) {
        return await this.getModel().findAll(options);
    }

    static async findById(id, options = {}) {
        return await this.getModel().findByPk(id, options);
    }

    static async findOne(where) {
        return await this.getModel().findOne({ where });
    }

    static async create(data) {
        return await this.getModel().create(data);
    }

    static async update(id, data) {
        const veiculo = await this.getModel().findByPk(id);
        if (veiculo) {
            return await veiculo.update(data);
        }
        return null;
    }

    static async delete(id) {
        return await this.getModel().destroy({ where: { id } });
    }
}

module.exports = Veiculo;