const Joi = require('joi');

const validateRequest = (req, res, next, schema) => {
    const options = {
        allowUnknown: true, // ignore unknown props
    }

    const { error, value } = schema.validate(req.body, options);

    if (error) {
        res.status(401).json({
            message: `${error.details.map(x => x.message).join(', ')}`
        })
    } else {
        req.body = value;
        next();
    }
}

exports.signupSchema = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(4).required(),
        password: Joi.string().min(6).required(),
        passwordConfirm: Joi.string().valid(Joi.ref('password')).required(),
    });

    validateRequest(req, res, next, schema);
}

exports.loginSchema = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(4).required(),
        password: Joi.string().min(6).required(),
    });

    validateRequest(req, res, next, schema);
}

exports.createTodoSchema = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().min(4).required(),
    });

    validateRequest(req, res, next, schema);
}