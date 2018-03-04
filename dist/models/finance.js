'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (sequelize, DataTypes) => {
  const Finance = sequelize.define('Finance', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false
    }
  });
  Finance.associate = models => {
    Finance.belongsTo(models.Forum, { foreignKey: 'ForumId' });
    Finance.hasMany(models.Message);
  };
  return Finance;
};