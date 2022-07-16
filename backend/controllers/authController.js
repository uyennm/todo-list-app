const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const db = require("./../models");
const User = db.User
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const signToken = (id) => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user.id);

    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    };

    res.cookie('jwt', token, cookieOptions);

    user.password = undefined;
    user.passwordConfirm = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        user
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    try {
        const user = await User.findOne({ 
            where: { username: req.body.username }
        });

        if (user) {
            res.status(409).json({
                message: "Username already exists",
            })
        }

        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
        });

        createSendToken(newUser, 201, res);
    } catch (error) {
        res.status(401).json({
            message: error.message,
        })
        console.log(error.message)
    }   

});

exports.login = catchAsync(async (req, res, next) => {
    const { username, password } = req.body;

    const user = await User.findOne({ 
        where: { username }
    })

    if (!user || !(await user.correctPassword(password, user.password))) {
        // return next(new AppError('Incorrect username or password', 401)); 
        res.status(401).json({
            message: "Incorrect username or password",
        })
    }

    createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next();
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currUser = await User.findByPk(decoded.id);
    if (!currUser) {
        return next(new AppError('The user belonging to this token does no longer exist', 401)); 
    }

    req.user = currUser;
    next();
})