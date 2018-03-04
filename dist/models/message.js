'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false
    },
    content: DataTypes.STRING
  });
  Message.associate = models => {
    Message.belongsTo(models.User, { foreignKey: 'UserId' });
    Message.belongsTo(models.Forum, { foreignKey: 'ForumId' });
  };
  return Message;
};