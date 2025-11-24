const { DataTypes } = require('sequelize');
const db = require('../../config/db');

class Empresa {
    constructor(nome, cnpj, endereco) {
        this.nome = nome;
        this.cnpj = cnpj;
        this.endereco = endereco;
    }

    static initModel() {
        return db.define('Empresa', {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            nome: { type: DataTypes.STRING, allowNull: false },
            cnpj: { type: DataTypes.STRING, allowNull: false },
            endereco: { type: DataTypes.STRING, allowNull: false }
        });
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

module.exports = Empresa;