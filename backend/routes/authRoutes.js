const express = require('express');
const authController = require('./../controllers/authController');
const validateController = require('../controllers/validateController');

const router = express.Router();

router.post('/signup', validateController.signupSchema, authController.signup);
router.post('/login', validateController.loginSchema, authController.login);

module.exports = router;