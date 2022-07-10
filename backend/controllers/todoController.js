const db = require("./../models");
const Todo = db.todos
const catchAsync = require('./../utils/catchAsync');

exports.getTodosOfUser = catchAsync(async (req, res, next) => {
    const todos = await Todo.findAll({
        where: {
            user: req.user.username,
        }
    } );  
  
    res.status(200).json({
        status: 'success',
        data: {
            todos,
        },
    });
});

exports.createTodo = catchAsync(async (req, res, next) => {
    const newTodo = await Todo.create({
        user: req.body.user.username,
        title: req.body.title,
        description: req.body.description,
        isDone: req.body.isDone
    });

    res.status(201).json({
        status: 'success',
        data: {
            todo: newTodo,
        }
    });
});

exports.updateTodo = catchAsync(async (req, res, next) => {
    const todo = await Todo.update(
        {
            title: req.body.title,
            description: req.body.description,
            isDone: req.body.isDone
        },
        {
            where: {
                id: req.params.id,
                user: req.body.user.username
            }
        }
    );

    if (!todo) {
        throw new Error('No todo found');
    }

    res.status(200).json({
        status: 'success',
        data: {
            todo
        }
    });
});

exports.deleteTodo = catchAsync(async (req, res, next) => {
    const todo = await Todo.destroy({
        where: {
            id: req.params.id
        }
    });

    if (!todo) {
        throw new Error('No todo found');
    }

    res.status(204).json({
        status: 'success',
        data: null,
    });
});