const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class Todo extends Model {}

Todo.init({
    user: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter the title'
            }
        }
    },
    description: {
        type: DataTypes.STRING,
    },
    isDone: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
  sequelize
});

module.exports = Todo;