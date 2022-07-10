module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define('todo', {
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

    Todo.associate = (models) => {
        Todo.belongsTo(models.User);
    };

    return Todo;
}