import Joi from "joi";

const createUserValidator = Joi.object({
	name: Joi.string()
		.pattern(/^[a-zA-Z]+$/)
		.min(2)
		.max(30)
		.required(),
	last_name: Joi.string()
		.pattern(/^[a-zA-Z]+$/)
		.min(2)
		.max(50)
		.required(),
	email: Joi.string()
		.email({ allowUnicode: true })
		.max(200)
		.required(),
	address: Joi.string()
		.min(2)
		.max(200),
	document_type: Joi.string()
		.valid("RUC", "DNI")
		.required(),
	document_number: Joi.when("document_type", {
			switch: [
				{ is: "RUC", then: Joi.string().pattern(/^\d+$/).length(11) },
				{ is: "DNI", then: Joi.string().pattern(/^\d+$/).length(8) }
			]
		})
		.required(),
	phone: Joi.string()
		.pattern(/^\d+$/)
		.length(9)
		.required(),
	permissions: Joi.array()
		.items(Joi.string())
		.default([])
});

export default createUserValidator;

