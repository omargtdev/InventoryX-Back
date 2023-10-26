import Joi from "joi";

const updateUserValidator = Joi.object({
	enabled: Joi.boolean()
		.required(),
	permissions: Joi.array()
		.items(Joi.string())
        .min(1)
		.required()
});

export default updateUserValidator;
