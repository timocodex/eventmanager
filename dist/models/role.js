'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false
    },
    name: DataTypes.STRING
  });

  Role.associate = function (models) {
    Role.belongsToMany(models.User, { through: models.UserDivisionRole });
    Role.belongsToMany(models.Division, { through: models.UserDivisionRole });
  };

  return Role;
};