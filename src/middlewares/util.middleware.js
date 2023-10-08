

const cleanBodyStringsExcept = (fieldsToIgnore) => {
	return (req, res, next) => {
		const { body } = req;
		const bodyKeys = Object.keys(body);
		if(!bodyKeys.any())
			return next();

		bodyKeys.forEach(key => {
			if(fieldsToIgnore.includes(key))
				return;

			const currentValue = body[key]; 
			if(typeof currentValue !== "string")
				return;
			
			body[key] = currentValue.trim() === "" ? null : currentValue.trim(); 
		});

		next();
	}
}

export default {
	cleanBodyStringsExcept
}
