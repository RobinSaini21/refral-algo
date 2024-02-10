const Joi = require("joi");


const registerValidation = (body) => {
    const validate = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        referralBonus: Joi.number().default(10).optional(),
        referral_code: Joi.string().optional(),
        parent_user: Joi.string().allow(null).optional(),
        children_user: Joi.array().items(Joi.string()).default([]).optional(),
        password: Joi.string().required()
    })

    return validate.validate(body)
}


module.exports = {
    registerValidation
}