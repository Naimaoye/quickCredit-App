import Joi from 'joi';

const usersValidator = (req, res, next) => {
    const schema = Joi.object().keys({
        email: Joi.string()
            .trim()
            .email()
            .required(),
        firstName: Joi.string()
            .regex(/^[A-Z]|[a-z]+$/)
            .min(3)
            .required(),
        lastName: Joi.string()
            .regex(/^[A-Z]|[a-z]+$/)
            .min(3)
            .required(),
        password: Joi.string()
            .min(7)
            .alphanum()
            .required(),
        address: Joi.string().required(),
        status: Joi.string()
            .insensitive()
            .default('unverified'),
        isAdmin: Joi.boolean().default(false)
    });

    return Joi.validate(req.body, schema, (error) => {
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }
        next();
    });
};


const loginValidator = (req, res, next) => {
    const schema = Joi.object().keys({
        email: Joi.string()
            .email()
            .trim()
            .lowercase()
            .required(),
        password: Joi.string()
            .min(7)
            .required()
            .strict(),
    });
    return Joi.validate(req.body, schema, (error) => {
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }
        next();
    });
};

const loanApprovalValidator = (req, res, next) => {
    const schema = Joi.object().keys({
        status: Joi.string()
            .insensitive()
            .valid('approved', 'rejected')
            .required(),
    });
    return Joi.validate(req.body, schema, (error) => {
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }
        next();
    });
};

const loanValidator = (req, res, next) => {
    const schema = Joi.object().keys({
        email: Joi.string()
            .email()
            .required(),
        firstName: Joi.string()
            .regex(/^[A-Z]|[a-z]+$/)
            .min(3)
            .required(),
        lastName: Joi.string()
            .regex(/^[A-Z]|[a-z]+$/)
            .min(3)
            .required(),
        tenor: Joi.number()
            .integer()
            .min(1)
            .max(12)
            .required(),
        amount: Joi.number().min(10000).required(),
    });
    return Joi.validate(req.body, schema, (error) => {
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }
        next();
    });
};

const loanQueryValidator = (req, res, next) => {
    const schema = Joi.object().keys({
        status: Joi.string()
            .insensitive()
            .valid('approved'),
        repaid: Joi.boolean()
            .insensitive()
            .valid(true, false),
    });
    return Joi.validate(req.body, schema, (error) => {
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }
        next();
    });
};

const userId = (req, res, next) => {
    const schema = Joi.object().keys({
        id: Joi.number()
            .required(),
    });
    return Joi.validate(req.body.id, schema, (error) => {
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }
        next();
    });
};


const loanRepaymentValidator = (req, res, next) => {
    const schema = Joi.object().keys({
        paidAmount: Joi.number().required(),
    });
    return Joi.validate(req.body, schema, (error) => {
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }
        next();
    });
};

module.exports = {
    usersValidator,
    loginValidator,
    loanApprovalValidator,
    loanValidator,
    loanQueryValidator,
    loanRepaymentValidator,
    userId
};
