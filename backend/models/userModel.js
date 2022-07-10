const bcrypt = require('bcryptjs');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
          notNull: {
              msg: 'Please enter your username'
            }
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
          notNull: {
              msg: 'Please enter your password'
            }
      }
    },
    passwordConfirm: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
          notNull: {
              msg: 'Please confirm your password'
            },
          isMatchWithPassword(value){
              if (value !== this.password) {
                  throw new Error('Passwords are not the same')
              }
          },
        },
    }
  });

  User.prototype.correctPassword = async (candidatePassword, userPassword) => {
          return await bcrypt.compare(candidatePassword, userPassword);
      };
  
  User.beforeSave(async (user, options) => {
      if (user.previous('password') !== user.password) {
          user.password = await bcrypt.hash(user.password, 10);
          user.passwordConfirm = await bcrypt.hash(user.passwordConfirm, 10);
      }
  });
  
  // User.associate = (models) => {
  //     User.hasMany(models.Todo);
  // };

  return User;
}