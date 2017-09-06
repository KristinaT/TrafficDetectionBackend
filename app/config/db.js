/**
 * Created by kristinataneva on 9/6/17.
 */

const Sequelize = require('sequelize');

const sequelize = new Sequelize('Congestion', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql',
});

// Connecting all the models/tables in the database to a db object, so that everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models/tables
db.traffic = require('../models/traffic')(sequelize, Sequelize);

module.exports = db;

