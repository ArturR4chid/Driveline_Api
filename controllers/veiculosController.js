const db = require('../config/db');

class VeiculoController {
    async getAll(req, res) {
        try {
            const [results] = await db.query('SELECT * FROM veiculos');
            res.json(results);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const [results] = await db.query('SELECT * FROM veiculos WHERE id = ?', [id]);
            res.json(results[0] || {});
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async create(req, res) {
        try {
            const { modelo, placa, empresa_id } = req.body;
            const [result] = await db.query(
                'INSERT INTO veiculos (modelo, placa, empresa_id) VALUES (?, ?, ?)',
                [modelo, placa, empresa_id]
            );
            res.json({ message: 'Veículo criado com sucesso!', id: result.insertId });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { modelo, placa, empresa_id } = req.body;
            await db.query(
                'UPDATE veiculos SET modelo=?, placa=?, empresa_id=? WHERE id=?',
                [modelo, placa, empresa_id, id]
            );
            res.json({ message: 'Veículo atualizado com sucesso!' });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await db.query('DELETE FROM veiculos WHERE id=?', [id]);
            res.json({ message: 'Veículo deletado com sucesso!' });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = new VeiculoController();