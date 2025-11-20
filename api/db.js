const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('drivelinepit', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;