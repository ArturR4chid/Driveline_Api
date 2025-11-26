const express = require('express');
const cors = require('cors');
const path = require('path');

// Tentar carregar o db de diferentes formas
let db;
try {
    db = require('../config/db');
    console.log('✅ db.js carregado de ../config/db');
} catch (error) {
    console.error('❌ Não foi possível carregar ../config/db:', error.message);
    try {
        db = require('../config/db');
        console.log('✅ db.js carregado de ../config/db');
    } catch (error2) {
        console.error('❌ Não foi possível carregar ../config/db:', error2.message);
        console.log('💡 Verifique se o arquivo api/config/db.js existe');
        process.exit(1);
    }
}

class App {
    constructor() {
        this.app = express();
        this.port = 3000;
        this.host = '0.0.0.0';
        this.initMiddlewares();
        this.initRoutes();
        this.initDatabase();
    }

    initMiddlewares() {
        this.app.use(express.json());
        this.app.use(cors());
        
        // Log de requisições
        this.app.use((req, res, next) => {
            console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
            next();
        });
    }

    initRoutes() {
        // Importar rotas
    const usuarioRoutes = require('./routes/UsuarioRoutes');
    const empresaRoutes = require('./routes/EmpresaRoutes');
    const veiculoRoutes = require('./routes/VeiculoRoutes');

        // Usar rotas
        this.app.use('/usuarios', usuarioRoutes);
        this.app.use('/empresas', empresaRoutes);
        this.app.use('/veiculos', veiculoRoutes);

        // ✅ ROTA RAIZ - Resolve "Cannot GET /"
        this.app.get('/', (req, res) => {
            res.json({
                message: '🚀 DriveLine Pit API está funcionando!',
                version: '1.0.0',
                timestamp: new Date(),
                endpoints: {
                    usuarios: {
                        listar: 'GET /usuarios',
                        criar: 'POST /usuarios',
                        login: 'POST /usuarios/login'
                    },
                    empresas: {
                        listar: 'GET /empresas',
                        criar: 'POST /empresas'
                    },
                    veiculos: {
                        listar: 'GET /veiculos',
                        criar: 'POST /veiculos'
                    }
                }
            });
        });

        // ✅ Rota de saúde da API
        this.app.get('/health', async (req, res) => {
            try {
                await db.sequelize.authenticate();
                res.json({
                    status: 'OK',
                    message: 'API e banco de dados estão funcionando',
                    database: 'Conectado',
                    timestamp: new Date()
                });
            } catch (error) {
                res.status(500).json({
                    status: 'ERROR',
                    message: 'API funcionando mas banco desconectado',
                    database: 'Desconectado',
                    error: error.message,
                    timestamp: new Date()
                });
            }
        });

        // ✅ Rota para teste rápido
        this.app.get('/test', (req, res) => {
            res.json({
                message: 'Teste bem sucedido!',
                data: {
                    usuario: 'Teste API',
                    status: 'Online'
                }
            });
        });

        // ✅ Middleware para rotas não encontradas
        this.app.use('*', (req, res) => {
            res.status(404).json({
                error: 'Rota não encontrada',
                path: req.originalUrl,
                availableRoutes: [
                    'GET /',
                    'GET /health',
                    'GET /test',
                    'GET /usuarios',
                    'POST /usuarios',
                    'POST /usuarios/login',
                    'GET /empresas',
                    'POST /empresas',
                    'GET /veiculos',
                    'POST /veiculos'
                ]
            });
        });
    }

    async initDatabase() {
        try {
            console.log('🔄 Iniciando banco de dados...');
            
            // Testar conexão
            const connected = await db.testConnection();
            if (!connected) {
                console.log('⚠️ Servidor rodando sem banco de dados');
                this.startServer();
                return;
            }

            // Sincronizar tabelas
            await db.syncDatabase();
            console.log('✅ Banco de dados pronto!');
            this.startServer();
            
        } catch (error) {
            console.error('❌ Erro no banco de dados:', error.message);
            console.log('⚠️ Iniciando servidor sem banco...');
            this.startServer();
        }
    }

    startServer() {
        this.app.listen(this.port, this.host, () => {
            console.log('=' .repeat(50));
            console.log('🚀 DRIVELINE PIT API INICIADA COM SUCESSO!');
            console.log('=' .repeat(50));
            console.log(`📍 Local: http://localhost:${this.port}`);
            console.log(`🌐 Rede: http://10.0.2.2:${this.port} (Android)`);
            console.log(`❤️ Saúde: http://localhost:${this.port}/health`);
            console.log(`📚 Documentação: http://localhost:${this.port}/`);
            console.log(`🧪 Teste: http://localhost:${this.port}/test`);
            console.log('=' .repeat(50));
        });
    }
}

module.exports = new App().app;