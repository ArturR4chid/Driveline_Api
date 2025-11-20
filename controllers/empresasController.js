const db = require('../config/db');

class EmpresaController {
    async getAll(req, res) {
        try {
            const [results] = await db.query('SELECT * FROM empresas');
            res.json(results);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const [results] = await db.query('SELECT * FROM empresas WHERE id = ?', [id]);
            res.json(results[0] || {});
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async create(req, res) {
        try {
            const { nome, cnpj, endereco } = req.body;
            const [result] = await db.query(
                'INSERT INTO empresas (nome, cnpj, endereco) VALUES (?, ?, ?)',
                [nome, cnpj, endereco]
            );
            res.json({ message: 'Empresa criada com sucesso!', id: result.insertId });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { nome, cnpj, endereco } = req.body;
            await db.query(
                'UPDATE empresas SET nome=?, cnpj=?, endereco=? WHERE id=?',
                [nome, cnpj, endereco, id]
            );
            res.json({ message: 'Empresa atualizada com sucesso!' });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await db.query('DELETE FROM empresas WHERE id=?', [id]);
            res.json({ message: 'Empresa deletada com sucesso!' });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = new EmpresaController();