const express = require('express');
const cors = require('cors');
const db = require('./db');

class App {
    constructor() {
        this.app = express();
        this.port = 3000;
        this.initMiddlewares();
        this.initRoutes();
        this.initDatabase();
    }

    initMiddlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    initRoutes() {
        const usuarioRoutes = require('./routes/UsuarioRoutes');
        const empresaRoutes = require('./routes/EmpresaRoutes');
        const veiculoRoutes = require('./routes/VeiculoRoutes');

        this.app.use('/usuarios', usuarioRoutes);
        this.app.use('/empresas', empresaRoutes);
        this.app.use('/veiculos', veiculoRoutes);
    }

    async initDatabase() {
        try {
            await db.sync();
            this.startServer();
        } catch (error) {
            console.error('erro ao sincronizar banco:', error);
        }
    }

    startServer() {
        this.app.listen(this.port, () => {
            console.log(`servidor rodando em http://localhost:${this.port}`);
        });
    }
}

module.exports = new App().app;