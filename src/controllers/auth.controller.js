import statusCodes from "../config/status-codes.js";
import encryptService from "../services/encrypt.service.js";
import jwtService from "../services/jwt.service.js";
import userService, { MappingTypes } from "../services/user.service.js";

const messages =  {
	MISSING_FIELDS: "Necesita proveer sus credenciales.",
	INVALID_CREDENTIALS: "Las credenciales dadas son incorrectas."
}

const getUserToken = async (req, res) => {
	try {
		const { username, password } = req.body;
		if(!username || !password)
			return res.status(statusCodes.BAD_REQUEST).json({ message: messages.MISSING_FIELDS });

		const user = await userService.findUserByUsername(username, MappingTypes.FULL);
		if(!user)
			return res.status(statusCodes.UNAUTHORIZED).json({ message: messages.INVALID_CREDENTIALS });

		const { salt, password: userPassword, id, name } = user;
		const isThePassword = encryptService.comparePassword(password, { salt, passwordHashed: userPassword });
		if(!isThePassword)
			return res.status(statusCodes.UNAUTHORIZED).json({ message: messages.INVALID_CREDENTIALS });

		const token = await jwtService.generateToken(id, name);
		return res.status(statusCodes.OK).json({ token });
	} catch(error) {
		console.log("ERROR AUTH CONTROLLER ---->", error);
		res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
	}
}

const getProfile = async (req, res) => {
	try {
		const { userId } = req;
		const user = await userService.findUserById(userId);
		return res.status(statusCodes.OK).json({ ...user });
	} catch (error) {
		console.log("ERROR GETTING PROFILE ---->", error);
		res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
	}
}

const updateProfile = (req, res) => {

}

export default {
	getUserToken,
	getProfile,
	updateProfile
}
