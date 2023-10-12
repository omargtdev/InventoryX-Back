import cluster from "../cluster/index.js";
import { mapper, MappingTypes } from "./mappers/user.mapper.js";
import generationService from "../services/generation.service.js";
import encryptService from "../services/encrypt.service.js";

const { User : UserModel } = cluster.databases.user.models;

const findUserByUsername = async (username, mappingType = MappingTypes.NONE) => {
	const userFounded = await UserModel.findOne({ username }).exec();
	return mapper(mappingType, userFounded);
}

const findUserById = async (id, mappingType = MappingTypes.NONE) => {
	const userFounded = await UserModel.findById(id).exec();
	return mapper(mappingType, userFounded);
}

const userExistsBy = async (filters) => {
	const userFounded = await UserModel.findOne(filters).exec();
	return Boolean(userFounded);
}

const getUsers = async (limit, page, mappingType = MappingTypes.NONE) => {
	let countPerPage = limit;
	let pageNumber = page;

	if(isNaN(countPerPage))
		countPerPage = 10;

	if(isNaN(pageNumber))
		pageNumber = 1;

	if(pageNumber <= -1 || countPerPage <= 0)
		return [];

	const countToSkip = (pageNumber - 1) * countPerPage;
	const users = await UserModel.find().skip(countToSkip).limit(countPerPage).exec();
	return users.map(user => mapper(mappingType, user));
}

// TODO: Review this, is too limited
const generateUsernameForUser = async (name, lastName) => {
	let actualNameIndex = 0; 
	let usernameFirstPart = name[actualNameIndex];
	let finalUsername = `${usernameFirstPart}${lastName}`.toLowerCase();
	while(await userExistsBy({ username: finalUsername })){
		actualNameIndex += 1;
		usernameFirstPart += name[actualNameIndex];
		finalUsername = `${usernameFirstPart}${lastName}`.toLowerCase();
	}
	return finalUsername;
};

const createUserWithRandomPassword = async (user) => {
	if(await userExistsBy({ email: user.email }))
		throw new Error("Email already exits!");

	const username = await generateUsernameForUser(user.name, user.last_name);

	const passwordRandom = generationService.generateRandomCharacters(12);
	const { salt, passwordHashed } = encryptService.encryptPassword(passwordRandom);

	const userCreated = await UserModel.create({
		...user,
		username,
		password: passwordHashed,
		salt
	});
	return mapper(MappingTypes.CREATED_USER, userCreated, { password: passwordRandom });
}

const updateUser = async (user) => {

}

export default {
	findUserByUsername,
	findUserById,
	getUsers,
	createUserWithRandomPassword
}

