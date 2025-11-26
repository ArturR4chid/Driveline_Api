const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

class Usuario {
    constructor(nome, email, senha) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    static initModel() {
        return sequelize.define('Usuario', {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            nome: { type: DataTypes.STRING, allowNull: false },
            email: { type: DataTypes.STRING, allowNull: false, unique: true },
            senha: { type: DataTypes.STRING, allowNull: false },
            telefone: { type: DataTypes.STRING },
            tipo: { 
                type: DataTypes.ENUM('admin', 'usuario', 'motorista'),
                defaultValue: 'usuario'
            },
            empresa_id: { type: DataTypes.INTEGER }
        }, {
            tableName: 'usuarios',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        });
    }

    static getModel() {
        return this.model || (this.model = this.initModel());
    }

    static async findAll() {
        return await this.getModel().findAll();
    }

    static async findById(id) {
        return await this.getModel().findByPk(id);
    }

    static async create(data) {
        return await this.getModel().create(data);
    }

    static async findOne(where) {
        return await this.getModel().findOne({ where });
    }

    static async update(id, data) {
        const usuario = await this.getModel().findByPk(id);
        if (usuario) {
            return await usuario.update(data);
        }
        return null;
    }

    static async delete(id) {
        return await this.getModel().destroy({ where: { id } });
    }
}

module.exports = Usuario;