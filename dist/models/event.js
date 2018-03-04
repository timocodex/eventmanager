'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false
    },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    eventDate: DataTypes.DATE
  });

  Event.associate = function (models) {
    Event.hasMany(models.Division);
    Event.hasMany(models.File);
    Event.hasMany(models.IncomeExpense);
    Event.hasMany(models.Forum);
  };

  return Event;
};