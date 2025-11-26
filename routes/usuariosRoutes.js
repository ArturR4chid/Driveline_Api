const express = require('express');
const UsuarioController = require('../controllers/usuariosController');
const router = express.Router();

class UsuarioRoutes {
    constructor() {
        this.router = router;
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.get('/', (req, res) => UsuarioController.getAll(req, res));
        this.router.post('/', (req, res) => UsuarioController.create(req, res));
        this.router.post('/login', (req, res) => UsuarioController.login(req, res));
        this.router.get('/:id', (req, res) => UsuarioController.getById(req, res));
        this.router.put('/:id', (req, res) => UsuarioController.update(req, res));
        this.router.delete('/:id', (req, res) => UsuarioController.delete(req, res));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new UsuarioRoutes().getRouter();