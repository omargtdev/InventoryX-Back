import Joi from "joi";

const updateUserStatusValidator = Joi.object({
	enabled: Joi.boolean()
		.required()
});

export default updateUserStatusValidator;

