import cluster from "../cluster/index.js"

const { User : UserModel } = cluster.databases.user.models;

// TODO: Consider move maps to another file (for other types) 
const mapUser = (user) => {
    const { id, name, last_name, username,
            email, address, phone, is_admin,
            photo_url, permissions } = user;

    const mappedUser = { 
        id, name, last_name, username,
        email, address, phone, is_admin,
        phone, photo_url, permissions
    };

    return mappedUser;
}

export const MappingTypes = {
    FULL: "FULL",
    PROFILE: "PROFILE"
}

const findUserByUsername = async (username, mappingType = MappingTypes.PROFILE) => {
    const userFounded = await UserModel.findOne({ username }).exec();
    return mappingType === MappingTypes.FULL ? userFounded : mapUser(userFounded);
}

const findUserById = async (id, mappingType = MappingTypes.PROFILE) => {
    const userFounded = await UserModel.findById(id).exec();
    return mappingType === MappingTypes.FULL ? userFounded : mapUser(userFounded);
}

export default {
    findUserByUsername,
    findUserById
}