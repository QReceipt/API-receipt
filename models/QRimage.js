const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('QRimage', {
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
    QRpath: {
      type: DataTypes.STRING(512),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'QRimage',
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
