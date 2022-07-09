const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const bcrypt = require('bcryptjs');

class User extends Model {
    static async correctPassword( candidatePassword, userPassword) {
        return await bcrypt.compare(candidatePassword, userPassword);
    };
}

User.init({
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
        // We require usernames to have length of at least 3, and
        // only use letters, numbers and underscores.
        is: /^\w{3,}$/,
        notNull: {
            msg: 'Please enter your username'
          }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        notNull: {
            msg: 'Please enter your password'
          }
    }
  },
  passwordConfirm: {
    type: DataTypes.STRING,
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
}, {
    sequelize
});

User.beforeSave(async (user, options) => {
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
        user.passwordConfirm = undefined;
    }
});

module.exports = User;