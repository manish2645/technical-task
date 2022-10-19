const Joi = require('@hapi/joi');

const authSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
});

const generateUser = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
})
module.exports = {
    generateUser,
    authSchema,
}
