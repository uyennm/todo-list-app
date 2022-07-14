const bcrypt = require('bcryptjs');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    username: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
    passwordConfirm: {
      type: Sequelize.STRING,
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

  return User;
}