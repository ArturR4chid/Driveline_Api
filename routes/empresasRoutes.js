const express = require('express');
const EmpresaController = require('../controllers/EmpresaController');
const router = express.Router();

class EmpresaRoutes {
    constructor() {
        this.router = router;
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.get('/', (req, res) => EmpresaController.getAll(req, res));
        this.router.get('/:id', (req, res) => EmpresaController.getById(req, res));
        this.router.post('/', (req, res) => EmpresaController.create(req, res));
        this.router.put('/:id', (req, res) => EmpresaController.update(req, res));
        this.router.delete('/:id', (req, res) => EmpresaController.delete(req, res));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new EmpresaRoutes().getRouter();