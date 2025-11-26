const { Sequelize } = require('sequelize');

// Configuração direta do Sequelize
const sequelize = new Sequelize(
    'drivelinepit',     // nome do banco
    'root',             // usuário
    '',                 // senha - DEIXE VAZIO PARA WAMP
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: false,
        timezone: '-03:00'
    }
);

// Testar conexão
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexão com MySQL estabelecida!');
        return true;
    } catch (error) {
        console.error('❌ Erro ao conectar com MySQL:', error.message);
        return false;
    }
}

// Sincronizar tabelas
async function syncDatabase() {
    try {
        await sequelize.sync({ force: false });
        console.log('✅ Tabelas sincronizadas!');
        return true;
    } catch (error) {
        console.error('❌ Erro ao sincronizar tabelas:', error.message);
        return false;
    }
}

// Exportar
module.exports = {
    sequelize,
    testConnection,
    syncDatabase
};