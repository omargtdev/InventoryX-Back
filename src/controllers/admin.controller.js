import statusCodes from "../config/status-codes.js";
import userService from "../services/user.service.js";
import createUserValidator from "./validators/admin/createUserValidator.js";

const getUsers = async (req, res) => {
	const { limit, page } = req.query;
	const users = await userService.getUsers(limit, page);
	return res.status(statusCodes.OK).json(users);
}

const getUser = async (req, res) => {
	const { userId } = req.params;
	const user = await userService.findUserById(userId);
	return res.status(statusCodes.OK).json(user);
}

const createUser = async (req, res) => {
	const { name, last_name, email, address, phone, permissions } = req.body;
	const { error, value: userValidated } = createUserValidator.validate({
		name, last_name, email,
		address, phone, permissions
	});

	if(error){
		const firstError = error.details[0];
		return res.status(statusCodes.BAD_REQUEST).send(firstError);
	}

	try {
		const userCreated = await userService.createUserWithRandomPassword(userValidated);
		return res.status(statusCodes.OK).json(userCreated);
	} catch (error) {
		return res.status(statusCodes.BAD_REQUEST).json({ message: error.message });
	}

}

const updateUser = async (req, res) => {
	const { userId } = req.params;
	const { } = req.body;
}

const changeStatusUser = async (req, res) => {
	const { userId } = req.params;
	const { enabled } = req.body;

}

export default {
	getUsers,
	getUser,
	createUser,
	updateUser,
	changeStatusUser
}

