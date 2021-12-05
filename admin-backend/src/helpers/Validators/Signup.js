/* eslint-disable require-jsdoc */
import Joi from 'joi';

const validation = (req, res, schema, next) => {
    const { error } = schema.validate(req.body, req.params, { abortEarly: false });
    if (error) {
        const errorMessages = [];
        error.details.forEach((detail) => {
            errorMessages.push(detail.message.split('"').join(''));
        });
        const err = errorMessages.toString();
        return res.status(200).send(err);
    }

    return next();
};

export default class InputValidation {
    static validateCreateUser(req, res, next){
        const schema = Joi.object({
            email: Joi.string()
                .email({ minDomainSegments: 2 })
                .message('email field should be a valid email address. e.g: johndoe@gmail.com.'),
        });
        validation(req, res, schema, next);
    }

    static validateLogin(req, res, next)  {
        const schema = Joi.object({
            email: Joi.string()
                .email({ minDomainSegments: 2 })
                .message('email field should be a valid email address. e.g: johndoe@gmail.com.')
                .required(),
            password: Joi.string()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.,])(?=.{8,})/)
                .message('Invalid Login detail')
                .required(),
        });
        validation(req, res, schema, next);
    }
}
