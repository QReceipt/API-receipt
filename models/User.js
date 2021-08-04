const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(512),
      allowNull: false
    },
    fullname: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    addr1: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    addr2: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    phoneNumber: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    userCategory: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'User',
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
    ]
  });
};
