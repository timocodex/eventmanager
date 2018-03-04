'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (sequelize, DataTypes) => {
  const UserForum = sequelize.define('UserForum', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false
    }
  });
  UserForum.associate = models => {
    UserForum.belongsTo(models.User, { foreignKey: 'UserId' });
    UserForum.belongsTo(models.Forum, { foreignKey: 'ForumId' });
    UserForum.belongsTo(models.Role, { foreignKey: 'RoleId' });
  };
  return UserForum;
};