import cluster from "../cluster/index.js";

const { Permission : Permission } = cluster.databases.user.models;

const validatePermissions = async (permissions) => {
    if(permissions.length === 0)
        return true;

    let actualPermissions = await Permission.find().select("key -_id");
    actualPermissions = actualPermissions.map(actualPermission => actualPermission.key);

    for (const permission of permissions)
        if (!actualPermissions.includes(permission)) 
            return false;

    return true;
}

export default { 
    validatePermissions
}