const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

const signToken = (id) => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    };

    res.cookie('jwt', token, cookieOptions);

    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });

    createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new Error('Please enter username and password!');
    }

    const user = await User.findOne({ 
        where: { username }
    })

    if (!user || !(await user.correctPassword(password, user.password))) {
        throw new Error('Incorrect username or password');
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
        // req.user = 'guest';
        // return next();
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currUser = await User.findByPk(decoded.id);
    if (!currUser) {
        throw new Error('The user belonging to this token does no longer exist');
    }

    req.user = currUser;
    next();
})