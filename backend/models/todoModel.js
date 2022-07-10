module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define('todos', {
        user: {
            type: Sequelize.STRING,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter the title'
                }
            }
        },
        description: {
            type: Sequelize.STRING,
        },
        isDone: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        }
    });

    return Todo;
}