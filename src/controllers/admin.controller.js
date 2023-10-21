import statusCodes from "../config/status-codes.js";
import permissionService from "../services/permission.service.js";
import userService from "../services/user.service.js";
import createUserValidator from "./validators/admin/createUserValidator.js";
import updateUserStatusValidator from "./validators/admin/updateUserStatusValidator.js";
import updateUserValidator from "./validators/admin/updateUserValidator.js";

const messages = {
	USER_DOES_NOT_EXIST: "User does not exist.",
	INVALID_PERMISSIONS: "Some permission is invalid.",
	SOMETHING_WAS_WRONG: "Something was wrong with the operation."
}

const getUsers = async (req, res) => {
	const { limit, page } = req.query;
	const users = await userService.getUsers(limit, page);
	return res.status(statusCodes.OK).json(users);
}

const getUser = async (req, res) => {
	const { userId } = req.params;
	const user = await userService.findUserById(userId);
	if(!user)
		return res.status(statusCodes.NOT_FOUND).json({ message: messages.USER_DOES_NOT_EXIST });

	return res.status(statusCodes.OK).json(user);
}

const createUser = async (req, res) => {
	const { name, last_name,
					email, address,
					phone, document_type,
					document_number,
					permissions
	} = req.body;

	const { error, value: userValidated } = createUserValidator.validate({
		name, last_name, email,
		address, phone, document_type,
		document_number, permissions
	});

	if(error){
		const firstError = error.details[0];
		return res.status(statusCodes.BAD_REQUEST).send(firstError);
	}

	if(!(await permissionService.validatePermissions(userValidated.permissions)))
		return res.status(statusCodes.BAD_REQUEST).json({ message: messages.INVALID_PERMISSIONS });

	try {
		const userCreated = await userService.createUserWithRandomPassword(userValidated);
		return res.status(statusCodes.CREATED).json(userCreated);
	} catch (error) {
		return res.status(statusCodes.BAD_REQUEST).json({ message: error.message });
	}

}

const updateUser = async (req, res) => {
	const { userId } = req.params;
	const { permissions } = req.body;

	const { error, value: { permissions: userPermissions } } = updateUserValidator.validate({ permissions });
	if(error){
		const firstError = error.details[0];
		return res.status(statusCodes.BAD_REQUEST).json(firstError);
	}

	const userExists = await userService.findUserById(userId);
	if(!userExists)
		return res.status(statusCodes.NOT_FOUND).json({ message: messages.USER_DOES_NOT_EXIST })

	if(!(await permissionService.validatePermissions(userPermissions)))
		return res.status(statusCodes.BAD_REQUEST).json({ message: messages.INVALID_PERMISSIONS });

	const userUpdated = await userService.updateUserPermissions(userId, userPermissions);
	if(!userUpdated)
		return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: messages.SOMETHING_WAS_WRONG });
	return res.status(statusCodes.OK).json(userUpdated);
}

const changeStatusUser = async (req, res) => {
	const { userId } = req.params;
	const { enabled } = req.body;

	const { error, value: { enabled: statusToChange } } = updateUserStatusValidator.validate({ enabled });
	if(error){
		const firstError = error.details[0];
		return res.status(statusCodes.BAD_REQUEST).json(firstError);
	}

	const userExists = await userService.findUserById(userId);
	if(!userExists)
		return res.status(statusCodes.NOT_FOUND).json({ message: messages.USER_DOES_NOT_EXIST })

	await userService.updateUserStatus(userId, statusToChange);

	return res.status(statusCodes.NO_CONTENT).send();
}

const deleteUser = async (req, res) => {
	const { userId } = req.params;

	const userExists = await userService.findUserById(userId);
	if(!userExists)
		return res.status(statusCodes.NOT_FOUND).json({ message: messages.USER_DOES_NOT_EXIST })

	await userService.deleteUser(userId);

	return res.status(statusCodes.NO_CONTENT).send();
}

const getAllPermissions = async (req, res) => {
	const permissions = await permissionService.getPermissions();
	return res.status(statusCodes.OK).json(permissions);
}

export default {
	getUsers,
	getUser,
	createUser,
	updateUser,
	changeStatusUser,
	getAllPermissions,
	deleteUser
}

