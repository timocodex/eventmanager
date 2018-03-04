import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type:DataTypes.STRING,
        primaryKey:true,
        unique:true,
        allowNull:false
      },
      email: {
        type:DataTypes.STRING,
        unique:true
      }, 
      password:DataTypes.STRING,
      firstName:DataTypes.STRING,
      lastName:DataTypes.STRING,
      profilePicture:DataTypes.STRING
    });
  
    User.associate = function(models) {
      User.belongsToMany(models.Role,{through:models.UserDivisionRole})
      User.belongsToMany(models.Division,{through:models.UserDivisionRole})
      User.hasMany(models.Message)
      User.hasMany(models.IncomeExpense)
    };
  
    User.beforeCreate(function(user, options) {
        return cryptPassword(user.password)
          .then(success => {
            user.password = success.hash
            user.salt = success.salt
          })
          .catch(err => {
            if (err) console.log(err);
          });
      });
    
      function cryptPassword(password) {
        const saltRounds = 10
        console.log("cryptPassword" + password);
        return new Promise(function(resolve, reject) {
          bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return reject(err);
    
              bcrypt.hash(password, salt, function(err, hash) {
                if (err){
                  console.log(error)
                  return reject(err);
                } 
                return resolve({hash:hash,salt:salt});
              });
    
          });
        });
      }
    return User;
};