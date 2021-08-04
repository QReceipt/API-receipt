'use strict';

const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./User')(sequelize, Sequelize);
db.Receipt = require('./Receipt')(sequelize, Sequelize);
db.Menu = require('./Menu')(sequelize, Sequelize);
db.Origin = require('./Origin')(sequelize, Sequelize);
db.QRimage = require('./QRimage')(sequelize, Sequelize);

module.exports = db;