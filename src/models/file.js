export default (sequelize, DataTypes) => {
    const File = sequelize.define('File', {
      id: {
        type:DataTypes.STRING,
        primaryKey:true,
        unique:true,
      },
      path:DataTypes.STRING,
      // filename: DataTypes.STRING,
      // mimetype: DataTypes.STRING,
      // encoding: DataTypes.STRING
    });
  
    File.associate = function(models) {
      File.belongsTo(models.Event,{
          foreignKey:'EventId'
      })
    };
  
    return File;
  };