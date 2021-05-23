const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: 5433,
    logging: false
})

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.log('Unable to connect to the database:', error);
}

module.exports = sequelize;
