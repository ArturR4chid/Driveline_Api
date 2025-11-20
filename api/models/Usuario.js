const { DataTypes } = require('sequelize');
const db = require('../db');

class Usuario {
    constructor(nome, email, senha) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    static initModel() {
        return db.define('Usuario', {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            nome: { type: DataTypes.STRING, allowNull: false },
            email: { type: DataTypes.STRING, allowNull: false, unique: true },
            senha: { type: DataTypes.STRING, allowNull: false }
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

    static async findOne(where) {
        return await this.getModel().findOne({ where });
    }
}

module.exports = Usuario;