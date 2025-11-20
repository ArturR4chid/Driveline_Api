const express = require('express');
const VeiculoController = require('../controllers/VeiculoController');
const router = express.Router();

class VeiculoRoutes {
    constructor() {
        this.router = router;
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.get('/', (req, res) => VeiculoController.getAll(req, res));
        this.router.get('/:id', (req, res) => VeiculoController.getById(req, res));
        this.router.post('/', (req, res) => VeiculoController.create(req, res));
        this.router.put('/:id', (req, res) => VeiculoController.update(req, res));
        this.router.delete('/:id', (req, res) => VeiculoController.delete(req, res));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new VeiculoRoutes().getRouter();