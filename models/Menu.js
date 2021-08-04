const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Menu', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    receipt: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Receipt',
        key: 'id'
      }
    },
    menuName: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    quentity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.STRING(512),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Menu',
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
        name: "receipt",
        using: "BTREE",
        fields: [
          { name: "receipt" },
        ]
      },
    ]
  });
};
