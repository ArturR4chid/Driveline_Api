const { Sequelize } = require('sequelize');

class Database {
  constructor() {
    this.connection = new Sequelize('drivelinepit', 'root', '', {
      host: 'localhost',
      dialect: 'mysql'
    });
  }

  authenticate() {
    return this.connection.authenticate();
  }

  sync() {
    return this.connection.sync();
  }
}

module.exports = new Database().connection;
