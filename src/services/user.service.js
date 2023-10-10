import cluster from "../cluster/index.js";
import userMapper from "./mappers/user.mapper.js";

const { User : UserModel } = cluster.databases.user.models;

export const MappingTypes = {
    FULL: "FULL",
    PROFILE: "PROFILE"
}

const findUserByUsername = async (username, mappingType = MappingTypes.PROFILE) => {
    const userFounded = await UserModel.findOne({ username }).exec();
    return mappingType === MappingTypes.FULL ? userFounded : userMapper.mapToUserProfile(userFounded);
}

const findUserById = async (id, mappingType = MappingTypes.PROFILE) => {
    const userFounded = await UserModel.findById(id).exec();
    return mappingType === MappingTypes.FULL ? userFounded : userMapper.mapToUserProfile(userFounded);
}

const getUsers = async (limit, page, mappingType = MappingTypes.PROFILE) => {
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
		return mappingType === MappingTypes.FULL ? users : users.map(user => userMapper.mapToUserProfile(user));
}

export default {
    findUserByUsername,
    findUserById,
		getUsers
}

