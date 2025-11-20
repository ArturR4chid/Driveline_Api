const Empresa = require('../api/models/Empresa');

class EmpresaController {
    async getAll(req, res) {
        try {
            const empresas = await Empresa.findAll();
            res.json(empresas);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const empresa = await Empresa.findByPk(id);
            if (empresa) {
                res.json(empresa);
            } else {
                res.status(404).json({ message: 'Empresa não encontrada' });
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async create(req, res) {
        try {
            const { nome, cnpj, endereco } = req.body;
            const novaEmpresa = await Empresa.create({ nome, cnpj, endereco });
            res.json({ message: 'Empresa criada com sucesso!', empresa: novaEmpresa });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { nome, cnpj, endereco } = req.body;
            
            const empresa = await Empresa.findByPk(id);
            if (!empresa) {
                return res.status(404).json({ message: 'Empresa não encontrada' });
            }

            await empresa.update({ nome, cnpj, endereco });
            res.json({ message: 'Empresa atualizada com sucesso!', empresa });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const empresa = await Empresa.findByPk(id);
            
            if (!empresa) {
                return res.status(404).json({ message: 'Empresa não encontrada' });
            }

            await empresa.destroy();
            res.json({ message: 'Empresa deletada com sucesso!' });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = new EmpresaController();