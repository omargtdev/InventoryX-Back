import statusCodes from "../config/status-codes.js";
import jwtService from "../services/jwt.service.js";
import userService from "../services/user.service.js";

const PATHS_TO_IGNORE = [
	"/",
	"/auth/login"
]

const messages = {
	UNAUTHORIZED: "Unauthorized.",
	INVALID_SCHEME: "Invalid authorization scheme."
}

/**
 * Validate JWT in request and add the userId from request
 * adding "userId" property to request.
 */
const validateJwt = async (req, res, next) => {
	if(PATHS_TO_IGNORE.includes(req.url))
		return next();

	const { authorization } = req.headers;
	if(!authorization)
		return res.status(statusCodes.UNAUTHORIZED).json({ message: messages.UNAUTHORIZED });

	const [scheme, token] = authorization.split(" ");

	if(scheme !== "Bearer")
		return res.status(statusCodes.UNAUTHORIZED).json({ message: messages.INVALID_SCHEME })

	try {
		const userId = await jwtService.validateToken(token);
		req.userId = userId;
	} catch (errorMessage) {
		return res.status(statusCodes.UNAUTHORIZED).json({ message: errorMessage });
	}

	next();
}

const validateUserAdmin = async (req, res, next) => {
	const { userId } = req;
	if(!userId)
		return res.status(statusCodes.UNAUTHORIZED).json({ message: messages.UNAUTHORIZED });

	try {
		const user = await userService.findUserById(userId);
		if(!user.is_admin)
			return res.status(statusCodes.UNAUTHORIZED).json({ message: messages.UNAUTHORIZED });
	} catch (error) {
		return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: error.toString() });
	}

	next();
}

export default {
	validateJwt,
	validateUserAdmin
}
