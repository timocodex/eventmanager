import Sequelize from 'sequelize'
const env       = process.env.NODE_ENV || 'development';
const config    = require(__dirname + '/../config/config.js')[env];
export default async () => {
const sequelize = new Sequelize(config.database,config.username,config.password,config);
const models = {
    User: sequelize.import('./user'),
    Role: sequelize.import('./role'),
    Event: sequelize.import('./event'),
    Forum: sequelize.import('./forum'),
    Message : sequelize.import('./message'),
    UserDivisionRole: sequelize.import('./userDivisionRole'),
    IncomeExpense: sequelize.import('./incomeExpense'),
    File:sequelize.import('./file'),
    Division:sequelize.import('./division')
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

return models;
}