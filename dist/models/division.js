'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (sequelize, DataTypes) => {
  const Division = sequelize.define('Division', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false
    },
    name: DataTypes.STRING
  });

  Division.associate = function (models) {
    Division.belongsTo(models.Event, {
      foreignKey: 'EventId'
    });
    Division.belongsToMany(models.Role, { through: models.UserDivisionRole });
    Division.belongsToMany(models.User, { through: models.UserDivisionRole });
  };

  return Division;
};