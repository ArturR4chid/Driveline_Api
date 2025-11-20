const db = require('../config/db');

class UsuarioController {
    async getAll(req, res) {
        try {
            const [results] = await db.query('SELECT * FROM usuarios');
            res.json(results);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const [results] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
            res.json(results[0] || {});
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async create(req, res) {
        try {
            const { nome, email, senha } = req.body;
            const [result] = await db.query(
                'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
                [nome, email, senha]
            );
            res.json({ message: 'Usuário criado com sucesso!', id: result.insertId });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { nome, email, senha } = req.body;
            await db.query(
                'UPDATE usuarios SET nome=?, email=?, senha=? WHERE id=?',
                [nome, email, senha, id]
            );
            res.json({ message: 'Usuário atualizado com sucesso!' });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await db.query('DELETE FROM usuarios WHERE id=?', [id]);
            res.json({ message: 'Usuário deletado com sucesso!' });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async login(req, res) {
        try {
            const { email, senha } = req.body;
            const [results] = await db.query(
                'SELECT * FROM usuarios WHERE email=? AND senha=?',
                [email, senha]
            );
            
            if (results.length > 0) {
                res.json({ message: 'Login bem-sucedido', usuario: results[0] });
            } else {
                res.status(401).json({ message: 'Credenciais inválidas' });
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = new UsuarioController();