const Usuario = require('../api/models/Usuario');

class UsuarioController {
    async getAll(req, res) {
        try {
            const usuarios = await Usuario.findAll();
            res.json(usuarios);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const usuario = await Usuario.findByPk(id);
            if (usuario) {
                res.json(usuario);
            } else {
                res.status(404).json({ message: 'Usuário não encontrado' });
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async create(req, res) {
        try {
            const { nome, email, senha } = req.body;
            const novoUsuario = await Usuario.create({ nome, email, senha });
            res.json({ message: 'Usuário criado com sucesso!', usuario: novoUsuario });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { nome, email, senha } = req.body;
            
            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            await usuario.update({ nome, email, senha });
            res.json({ message: 'Usuário atualizado com sucesso!', usuario });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const usuario = await Usuario.findByPk(id);
            
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            await usuario.destroy();
            res.json({ message: 'Usuário deletado com sucesso!' });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async login(req, res) {
        try {
            const { email, senha } = req.body;
            const usuario = await Usuario.findOne({ where: { email, senha } });
            
            if (usuario) {
                res.json({ message: 'Login bem-sucedido', usuario });
            } else {
                res.status(401).json({ message: 'Credenciais inválidas' });
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = new UsuarioController();