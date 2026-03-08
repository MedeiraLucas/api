const { Sequelize } = require('sequelize');

// Aqui fica a configuração da conexão com o MySQL.
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false // Deixei false para o terminal não ficar poluído.
  }
);

module.exports = sequelize;
