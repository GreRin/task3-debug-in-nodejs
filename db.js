const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    operatorsAliases: false,
    port: 5433
})

try {
    sequelize.authenticate()
    console.log("Connected to DB");
} catch (err) {
    console.log(`Error: ${err}`);
}

module.exports = sequelize;
