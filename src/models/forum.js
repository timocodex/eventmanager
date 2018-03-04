export default (sequelize, DataTypes) => {
    const Forum = sequelize.define('Forum', {
      id: {
        type:DataTypes.STRING,
        primaryKey:true,
        unique:true,
        allowNull:false
      },
      title:DataTypes.STRING,
      content:DataTypes.TEXT,
    });
  
    Forum.associate = function(models) {
      Forum.belongsTo(models.Event,{foreignKey:'EventId'})
      Forum.hasMany(models.Message)
    };
  
    return Forum;
};