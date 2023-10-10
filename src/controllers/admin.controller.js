import statusCodes from "../config/status-codes.js";
import userService from "../services/user.service.js";

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
		const { userId } = req.params;
}

const updateUser = async (req, res) => {
		const { userId } = req.params;
}

const changeStatusUser = async (req, res) => {
		const { userId } = req.params;
}

export default {
		getUsers,
		getUser,
		createUser,
		updateUser,
		changeStatusUser
}

