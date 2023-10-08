import jwt from "jsonwebtoken";

import { TOKEN_ALGORITHM, TOKEN_EXPIRY_TIME, TOKEN_SECRET } from "../config/env.js";
import userService from "./user.service.js";

const tokenDefaultOptions = {
	algorithm: TOKEN_ALGORITHM,

	// Registered claims
	issuer: "inventoryx-api", // who issued the token
	expiresIn: TOKEN_EXPIRY_TIME, // when the token should expire
}

const generateToken = (id, name) => new Promise((resolve, reject) => {

	const options = {
		...tokenDefaultOptions,
		subject: id // to whom the token was issued
	}

	jwt.sign({ name }, TOKEN_SECRET, options, (err, token) => {
		if(err)
			return reject(err);

		resolve(token);
	});
});

const tokenErrorTypes = {
	"jwt must be provided": "EMPTY",
	"jwt malformed": "MALFORMED",
	"jwt expired": "EXPIRED",
	"invalid signature": "INVALID_SIGNATURE"
}

const tokenErrorMessages = {
	EMPTY: "Invalid token.",
	INVALID_TOKEN: "Invalid token.",
	MALFORMED: "Invalid format token.",
	EXPIRED: "Token expired. Generate another.",
	INVALID_SIGNATURE: "Invalid token.",
	INEXISTENT_SUBJECT: "Invalid subject."
}

const validateToken = (token) => new Promise((resolve, reject) => {
	const options = {
		algorithms: [tokenDefaultOptions.algorithm],
		issuer: tokenDefaultOptions.issuer,
		ignoreExpiration: false,
		complete: false
	};
	
	jwt.verify(token, TOKEN_SECRET, options, async (err, payload) => {
		if(err){
			console.log(err);
			const errorType  = tokenErrorTypes[err.message];
			const errorMessage = tokenErrorMessages[errorType];
			return reject(errorMessage);
		}
		
		const { sub: userId } = payload;
		const userFounded = await userService.findUserById(userId);
		if(!userFounded)
			reject(tokenErrorMessages.INVALID_TOKEN);

		resolve(userId);
	})
});

export default {
	generateToken,
	validateToken
}
