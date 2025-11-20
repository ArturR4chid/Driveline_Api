const Veiculo = require('../api/models/Veiculo');

class VeiculoController {
    async getAll(req, res) {
        try {
            const veiculos = await Veiculo.findAll({
                include: ['Empresa'] 
            });
            res.json(veiculos);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const veiculo = await Veiculo.findByPk(id, {
                include: ['Empresa']
            });
            if (veiculo) {
                res.json(veiculo);
            } else {
                res.status(404).json({ message: 'Veículo não encontrado' });
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async create(req, res) {
        try {
            const { modelo, placa, empresa_id } = req.body;
            const novoVeiculo = await Veiculo.create({ modelo, placa, empresa_id });
            res.json({ message: 'Veículo criado com sucesso!', veiculo: novoVeiculo });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { modelo, placa, empresa_id } = req.body;
            
            const veiculo = await Veiculo.findByPk(id);
            if (!veiculo) {
                return res.status(404).json({ message: 'Veículo não encontrado' });
            }

            await veiculo.update({ modelo, placa, empresa_id });
            res.json({ message: 'Veículo atualizado com sucesso!', veiculo });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const veiculo = await Veiculo.findByPk(id);
            
            if (!veiculo) {
                return res.status(404).json({ message: 'Veículo não encontrado' });
            }

            await veiculo.destroy();
            res.json({ message: 'Veículo deletado com sucesso!' });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = new VeiculoController();