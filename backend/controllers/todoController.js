const db = require("./../models");
const Todo = db.Todo
const catchAsync = require('./../utils/catchAsync');

exports.getTodosOfUser = catchAsync(async (req, res, next) => {
    const todos = await Todo.findAll({
        where: {
            userId: req.user.id,
        }
    });  
  
    res.status(200).json({
        status: 'success',
        user: req.user,
        todos,
    });
});

exports.createTodo = catchAsync(async (req, res, next) => {
    const newTodo = await Todo.create({
        userId: req.user.id,
        title: req.body.title,
        description: req.body.description,
        isDone: req.body.isDone
    });

    res.status(201).json({
        status: 'success',
        user: req.user,
        todo: newTodo,
    });
});

exports.updateTodo = catchAsync(async (req, res, next) => {
    const isFoundTodo = await Todo.update(
        {
            title: req.body.title,
            description: req.body.description,
            isDone: req.body.isDone
        },
        {
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        }
    );
    
    if (!isFoundTodo) {
        throw new Error('No todo found');
    }

    const todo = {
        title: req.body.title,
        description: req.body.description,
        isDone: req.body.isDone
    }

    res.status(200).json({
        status: 'success',
        todo
    });
});

exports.deleteTodo = catchAsync(async (req, res, next) => {
    const todo = await Todo.destroy({
        where: {
            id: req.params.id,
            userId: req.user.id
        }
    });

    if (!todo) {
        throw new Error('No todo found');
    }

    res.status(204).json({
        status: 'success',
    });
});