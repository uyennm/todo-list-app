const express = require('express');
const todoController = require('../controllers/todoController');
const authController = require('../controllers/authController');
const validateController = require('../controllers/validateController');

const router = express.Router();

router
    .route('/')
    .get(authController.protect, todoController.getTodosOfUser)
    .post(authController.protect, todoController.createTodo);

router
    .route('/:id')
    .patch(authController.protect, todoController.updateTodo)
    .delete(authController.protect, todoController.deleteTodo);

module.exports = router;