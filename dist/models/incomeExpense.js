'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (sequelize, DataTypes) => {
  const IncomeExpense = sequelize.define('IncomeExpense', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false
    },
    picture: DataTypes.STRING,
    isIncome: DataTypes.BOOLEAN,
    value: DataTypes.INTEGER,
    verified: DataTypes.BOOLEAN,
    verifiedBy: DataTypes.STRING
  });
  IncomeExpense.associate = models => {
    IncomeExpense.belongsTo(models.Event, { foreignKey: 'EventId' });
    IncomeExpense.belongsTo(models.User, { foreignKey: 'UserId' });
  };
  return IncomeExpense;
};