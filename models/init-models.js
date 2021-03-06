var DataTypes = require("sequelize").DataTypes;
var _Menu = require("./Menu");
var _QRimage = require("./QRimage");
var _Receipt = require("./Receipt");
var _User = require("./User");

function initModels(sequelize) {
  var Menu = _Menu(sequelize, DataTypes);
  var QRimage = _QRimage(sequelize, DataTypes);
  var Receipt = _Receipt(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);

  Menu.belongsTo(Receipt, { as: "receipt_Receipt", foreignKey: "receipt"});
  Receipt.hasMany(Menu, { as: "Menus", foreignKey: "receipt"});
  QRimage.belongsTo(Receipt, { as: "receipt_Receipt", foreignKey: "receipt"});
  Receipt.hasMany(QRimage, { as: "QRimages", foreignKey: "receipt"});
  Receipt.belongsTo(User, { as: "seller_User", foreignKey: "seller"});
  User.hasMany(Receipt, { as: "Receipts", foreignKey: "seller"});

  return {
    Menu,
    QRimage,
    Receipt,
    User,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
