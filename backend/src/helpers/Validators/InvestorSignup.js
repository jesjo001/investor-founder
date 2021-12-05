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
    static validateInvestorSignup(req, res, next) {
        const schema = Joi.object({
            password: Joi.string()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.,])(?=.{6,})/)
                .message(
                    'password field should contain at least 6 characters, at least 1 lowercase, 1 uppercase and 1 number and a special character.'
                )
                .required(),
            email: Joi.string()
                .email({ minDomainSegments: 2 })
                .message('email field should be a valid email address. e.g: johndoe@gmail.com.'),
            name: Joi.string().required().empty(''),
            personal: Joi.string().empty(''),
            type: Joi.string().valid('angel investor', 'vc', 'family office'),
            expertise: Joi.string(),
            investedIn: Joi.string(),
            ticketSize: Joi.string().valid('0K - 100K','100K - 500K','500k - 1MIL','1MIL - 5MIL','5MIL - 10MIL',),
            industryType: Joi.string().valid( 'Enterprise Software', 'Fintech', 'Health', 'Transportation', 'Marketing',),
            industryLocation: Joi.string().valid('Western Europe', 'Central and Eastern Europe', 'Asia', 'Africa', 'Mediterranean & Middle East',),
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
