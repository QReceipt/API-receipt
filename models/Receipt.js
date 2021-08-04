const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Receipt', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    receiptID: {
      type: DataTypes.STRING(512),
      allowNull: false
    },
    seller: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    destinationAddr1: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    destinationAddr2: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    destinationPhoneNum: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    shopRequest: {
      type: DataTypes.STRING(2048),
      allowNull: true
    },
    deliveryRequests: {
      type: DataTypes.STRING(2048),
      allowNull: true
    },
    origin: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Origin',
        key: 'id'
      }
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Receipt',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "seller",
        using: "BTREE",
        fields: [
          { name: "seller" },
        ]
      },
      {
        name: "origin",
        using: "BTREE",
        fields: [
          { name: "origin" },
        ]
      },
    ]
  });
};
