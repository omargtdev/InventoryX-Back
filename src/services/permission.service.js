import cluster from "../cluster/index.js";

const { Permission : Permission } = cluster.databases.user.models;

const validatePermissions = async (permissions) => {
    if(permissions.length === 0)
        return true;

    for (const permission of permissions) {
			const permissionFound = await Permission.findOne({ key: permission }).exec();
			if(!permissionFound)
				return false;
		}

    return true;
}

const getPermissions = async () => {
	const permissions = await Permission.find();
	return permissions;
}

export default {
    validatePermissions,
		getPermissions
}

