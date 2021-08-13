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
db.QRimage = require('./QRimage')(sequelize, Sequelize);


db.Menu.belongsTo(db.Receipt, { as: "receipt_Receipt", foreignKey: "receipt"});
db.Receipt.hasMany(db.Menu, { as: "Menus", foreignKey: "receipt"});
db.QRimage.belongsTo(db.Receipt, { as: "receipt_Receipt", foreignKey: "receipt"});
db.Receipt.hasMany(db.QRimage, { as: "QRimages", foreignKey: "receipt"});
db.Receipt.belongsTo(db.User, { as: "seller_User", foreignKey: "seller"});
db.User.hasMany(db.Receipt, { as: "Receipts", foreignKey: "seller"});

module.exports = db;