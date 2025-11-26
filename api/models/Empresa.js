const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

class Empresa {
    constructor(nome, cnpj, endereco) {
        this.nome = nome;
        this.cnpj = cnpj;
        this.endereco = endereco;
    }

    static initModel() {
        return sequelize.define('Empresa', {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            razao_social: { type: DataTypes.STRING, allowNull: false },
            nome_fantasia: { type: DataTypes.STRING },
            cnpj: { type: DataTypes.STRING, allowNull: false, unique: true },
            email: { type: DataTypes.STRING },
            telefone: { type: DataTypes.STRING },
            rua: { type: DataTypes.STRING },
            numero: { type: DataTypes.STRING },
            bairro: { type: DataTypes.STRING },
            cidade: { type: DataTypes.STRING },
            estado: { type: DataTypes.STRING(2) },
            cep: { type: DataTypes.STRING }
        }, {
            tableName: 'empresas',
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

    static async update(id, data) {
        const empresa = await this.getModel().findByPk(id);
        if (empresa) {
            return await empresa.update(data);
        }
        return null;
    }

    static async delete(id) {
        return await this.getModel().destroy({ where: { id } });
    }
}

module.exports = Empresa;