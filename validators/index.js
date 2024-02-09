const Joi = require("joi");


const registerValidation = (body) => {
    const validate = Joi.object({
        name: Joi.string().max(100).min(4).required(),
        email: Joi.string().max(200).min(6).email().required(),
        password: Joi.string().max(30).min(4).required()
    })

    return validate.validate(body)
}


module.exports = {
    registerValidation
}